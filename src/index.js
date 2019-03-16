import path from 'path';

const defaultOptions = {
    features: []
};

export default function (moduleOptions) {
    
    // Merge options:
    const options = {
        defaultOptions,
        ...this.options.polyfill,
        ...moduleOptions
    }

    // Add polyfill plugins:
    options.features.forEach(feature => {
        
        const params = {
            require: feature.require,
            name: feature.name || (Array.isArray(require) ? require.join(',') : feature.require.toString())
        };

        if (typeof feature.detect === 'function') {
            params.detect = feature.detect.toString();
        }

        if (typeof feature.install === 'function') {
            params.install = feature.install.toString();
        }

        this.addTemplate({
            src: path.resolve(__dirname, 'templates/plugin.js'),
            fileName: path.join('nuxt-polyfill', params.name + '.js'),
            options: params
        });

        this.options.plugins.unshift({
            src: path.join(this.options.buildDir, `nuxt-polyfill/${params.name}.js`),
            ssr: false
        });
    })

    
}