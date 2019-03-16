

# nuxt-polyfill
Ease adding polyfills to your Nuxt.js project.

❗️ **Requires** Nuxt 2

## Features
 - ✔ Easy to configure
 - ❔ Lazy load polyfills **only if needed** by using `Feature Detection`
 - ⚡️ Aims to be as fast as possible
 - 🔧 Supports any polyfill as NPM package or JS file
 - ⭐️ Supports polyfills from [polyfill.io](https://polyfill.io)
 - Detect function can be called before loading the features
 - Polyfills are not included in the bundle but loaded separately
   
## Roadmap
 - Support for server side polyfills
 - Support for require array (necessary for Intl polyfill)

## Getting started
```
npm install nuxt-polyfill
```

Add the module to your `nuxt.config.js`: 

```javascript
export default {
    
    // Configure polyfills:
    polyfill: {
        features: [
            /* 
                Feature without detect:

                Note: 
                  This is not recommended for most polyfills
                  because the polyfill will always be loaded, parsed and executed.
            */
            {
                require: 'url-polyfill' // NPM package or require path of file
            },

            /* 
                Feature with detect:

                Detection is better because the polyfill will not be 
                loaded, parsed and executed if it's not necessary.
            */
            {
                require: 'intersection-observer',
                detect: () => 'IntersectionObserver' in window,
            },

            /*
                Feature with detect & install:

                Some polyfills require a installation step
                Hence you could supply a install function which accepts the require result
            */
            {
                require: 'smoothscroll-polyfill',

                // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
                detect: () => 'scrollBehavior' in document.documentElement.style && window.__forceSmoothScrollPolyfill__ !== true,

                // Optional install function called client side after the package is required:
                install: (smoothscroll) => smoothscroll.polyfill()
            }
        ]
    },
    
    // Add it to the modules section:
    modules: [
        'nuxt-polyfill',
    ]
}
```

## Polyfills (including detection functions):
 - [https://github.com/Financial-Times/polyfill-library](https://github.com/Financial-Times/polyfill-library)

## Documentation
### feature.name
Type `String`. Not required.

### feature.require
Type `String`. NPM package or require path of JS file.

### feature.detect
Type `Function`. Detection function, should return a `Boolean`.

### feature.install
Type `Function`. Installation function. First argument is the default export in the required file/package.

### feature.mode
Not supported yet. Only client polyfills are supported.
