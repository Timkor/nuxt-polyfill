**Warning:** This package is under development, will be published shortly

# nuxt-polyfill
Ease adding polyfills to your Nuxt.js project using [polyfill.io](polyfill.io) among others.

## Features
 - Easy to configure
 - Load polyfills **only if needed**
 - Aims to be as fast as possible
 - Supports polyfills from [polyfill.io](polyfill.io)
 - Supports custom polyfills

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
            // Add features:
            {
                type: 'service',
                detect: () => IntersectionObserver in window, // Will be called client side on load
                feature: 'IntersectionObserver' 
            }
        ]
    }
    
    // Add it to the modules section:
    modules: [
        'nuxt-polyfill',
    ]
}
```

## Examples
### Simple features

### Custom features

### Full Nuxt.js example projects
