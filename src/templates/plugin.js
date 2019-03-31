

export default () => {

    if (process.server) {
        return;
    }
    
    <% if (typeof options.detect === 'string') { %>
            
    const detect = <%= options.detect  %>;
    
    <% if (options.log) { %>
    console.log('Detect '  + <%= JSON.stringify(options.name) %>, detect());
    <% } %>

    if (detect()) {
        
        return;
    }

    <% } %>

    <% if (!options.include) { %>
    return new Promise((resolve, reject) => {

        require.ensure([
            <%= JSON.stringify(options.require) %>
        ], function (require) {

            <% } %>

            const polyfill = require(<%= JSON.stringify(options.require) %>);
            
            <% if (options.log) { %>
            console.log('Load ' + <%= JSON.stringify(options.name) %>);
            <% } %>
            
            <% if (typeof options.install === 'string') { %>
            
            const install = <%= options.install  %>;

            install(polyfill);

            <% } %>

    <% if (!options.include) { %>

            resolve();
        });
    });
    <% } %>
}