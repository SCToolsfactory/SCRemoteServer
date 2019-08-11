// Babel config to create iOS 9.3 (and other legacy browser) compliant Javascript
// https://babeljs.io/docs/en/
// must reside in the package root together wirh package.json
// run with $ npm run build   - indput is in src folder; output is in lib folder

"use strict";

module.exports = function (api) {
    api.cache(true);
  
    const config = {
      sourceType: "script", // input type
      comments: false,      // remove comments in output
      presets : [ 
        ["@babel/preset-env" ,
          {
              "useBuiltIns" : "entry",
              // # Browsers to support
              // # see https://github.com/browserslist/browserslist
              "targets" : "last 3 firefox versions"
                        + ", last 3 chrome versions"
                        + ", last 3 edge versions" 
                        + ", last 3 android versions"
                        + ", last 3 safari versions"
                        + ", ios_saf 9.3-12"
                        + ", ie 10-11"
                        + ", not dead",
              //  V3 is suggested..
              "corejs" : { "version": 3, "proposals": true }
          }
        ]      
     ],
    };
  
    return config;
  }