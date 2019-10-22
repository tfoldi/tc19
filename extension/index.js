(function () {

        tableau.extensions.initializeAsync().then(function() {    
          document.getElementById("status").innerText = "SDK initialized!"
        });
        
})()