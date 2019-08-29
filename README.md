

# nuxt-polyfill
![npm](https://img.shields.io/npm/dt/nuxt-polyfill.svg)

Ease adding polyfills to your Nuxt.js project.

**Requires** Nuxt >= 2

## Features
 - ✔ Easy to configure
 - ❔ Lazy load polyfills **only if needed** by using `Feature Detection`
 - ⚡️ Aims to be as fast as possible
 - 🔧 Supports any polyfill as NPM package or JS file
 - ⭐️ Supports polyfills from [polyfill.io](https://polyfill.io)
 - Detect function can be called before loading the features
 - Polyfills are not included in the bundle but loaded separately

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

**Note:** You need to install the NPM packages manually.

In order to run this example:
```
npm i url-polyfill intersection-observer smoothscroll-polyfill
```


## Useful polyfill links (including detection functions):
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

### feature.include 
Type `Boolean`. Default: `false`
Specify if the polyfill will be included into the default bundle. This will make sure the polyfill is downloaded together with the rest of your application. This might reduce page speed.

**Note:** If you care about **SEO**. You might want to set this option to `true`. Google uses Chrome 41 to index your website although it is not clear whether Google uses these page speed metrics. It is also said that Google uses metrics from Chrome users.
This also depends on the size and the probability of the availability of native support. If a polyfill's bundle size is really and/or a polyfill is more likely required (because current support is bad), you should set this flag to true.  

### feature.mode
Not supported yet. Only client polyfills are supported.

## Roadmap
 - Support for server side polyfills
 - Support for require array (necessary for Intl polyfill)
