# Basic Python code as Parameter editor extension for Tableau


This extension displays a simple python code editor for editing python code that is stored as a parameter in a Tableau Dashboard.


## Running it

The extension only needs a static HTTP server. If it is served on port `8080` as `/index.html`, then the included `demo.trex` file can be used to add the extension to the dashboard.

## Configuration

The name of the parameter to edit can be set on line 2 of `index.js`:


```js
// The name of the parameter contining the code
const DEFAULT_PARAMETER_NAME = "<THE NAME OF THE PARAMETER>";
```
