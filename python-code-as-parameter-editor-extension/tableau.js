let TableauHelper = (function(){
  const DEBUG = true;

  // returns true if we are running in Tableau
  function haveTableau() {
    return typeof tableau.extensions.dashboardContent !== 'undefined';
  }

  function boot() {
    // if (!haveTableau()) {
    //   return Promise.resolve("Not running inside tableau!");
    // }

    return tableau.extensions.initializeAsync();
  }


  // Attempts to get the value of a parameter from tableau, if not successful
  // then return defaultValue
  function getParameterValue(name, defaultValue) {
    if (!haveTableau()) {
      console.log("Not running inside Tableau, returning default value", defaultValue,"for parameter", name);
      return Promise.resolve(defaultValue);
    }

    // get all parameters and filter our chosen one
    let {dashboard} = tableau.extensions.dashboardContent;
    return dashboard.getParametersAsync()
      .then(params => {
        let param = params.find(p => p.name === name);
        // check for undefined as both false and zero are valid parameter values
        return (typeof param !== 'undefined') ? param.currentValue.value : defaultValue;
      });
  }

  function setParametersAsync(parameterKeyValues) {
    if (!haveTableau()) {
      console.log("Not running inside Tableau: Skipping setting of parameters:", {...parameterKeyValues});
      return Promise.resolve(null);
    }

    let dashboard = tableau.extensions.dashboardContent.dashboard;

    // the list of parameter names we care about
    let keysWeCare = Object.keys(parameterKeyValues);

    return dashboard.getParametersAsync()
      .then(params => {
        console.log("Parameters: ", params);
        // filter down the parameter list
        let matchingParams = params.filter(param => keysWeCare.includes(param.name));

        // change each matching parameter to the desired value
        let changeValues = matchingParams
          .map(param => {
            let paramValue = parameterKeyValues[param.name]
            console.log("SETTING PARAMETER %s", param.name, "=", paramValue);
            return param.changeValueAsync(paramValue);
          })

        // wait for all changes to complete
        return Promise.all(changeValues)
          .catch(err => {
            console.log("ERROR while setting parameters: ", err);
          })
      })

  }

  // TODO: add any code transforms here

  function encodeParameterValue(v) {
    return v;
  }

  function decodeParameterValue(v) {
    return v;
  }


  return {
    haveTableau,
    boot,

    setParametersAsync,

    getParameterValue,


    encodeParameterValue,
    decodeParameterValue,

  };
})();
