// The name of the parameter contining the code
const DEFAULT_PARAMETER_NAME = "Python Code to Evaluate";

Vue.component('prism-editor', VuePrismEditor);

new Vue({
  el: '#app',
  data: {
    parameterName: DEFAULT_PARAMETER_NAME,
    code: `return "Hello World"`,
    // contains the last read code from the Tableau parameter
    // Can be used to check for changes
    codeFromTableau: null,

    parameterFound: false,
    isLoading: false,

  },
  computed: {
    // are there changes from the Tableau version of the code?
    haveChanges() {
      return this.code !== this.codeFromTableau;
    }
  },
  methods: {
    // Attempts to get the value of a parameter
    readFromTableau() {
      let {parameterName} = this;
      return this.withLoading(() => TableauHelper.getParameterValue(parameterName))
        .then(value => {
          // set to empty string and signal
          if (typeof value === 'undefined') {
            this.codeFromTableau = "";
            this.parameterFound = false;
            return;
          }

          this.codeFromTableau = value;
          this.code = TableauHelper.decodeParameterValue(value);
          this.parameterFound = true;
        })
        .catch(err => console.error("While reading parameter value from Tableau:", err));
    },

    // attempts to save the code to the Tableau Parameter
    saveToTableau() {
      let transformedCode = TableauHelper.encodeParameterValue(this.code);
      return this.withLoading(() => TableauHelper.setParametersAsync({[this.parameterName]: this.code}))
        // re-read the value after saving
        .then(_ => this.readFromTableau());
    },

    // Wraps a function returning a promise with loading start/stop
    withLoading(promiseFn) {
      this.startLoading();
      return promiseFn()
        .then(v => { this.stopLoading(); return v; })
        .catch(err => { this.stopLoading(); return Promise.reject(err); });
    },

    startLoading() {
      this.isLoading = true;
    },

    stopLoading() {
      this.isLoading = false;
    }
  },
  mounted() {
    console.log("Hello world");
    // boot Tableau
    TableauHelper.boot()
      .then(() => this.readFromTableau())
      .catch(err => console.error("Error while initializing:", err));
  },
})




