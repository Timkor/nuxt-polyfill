

export default () => {

    <% if (typeof options.detect === 'string') { %>
            
    const detect = <%= options.detect  %>;

    if (detect()) {
        return;
    }

    <% } %>

    return new Promise((resolve, reject) => {

        require.ensure([
            <%= JSON.stringify(options.require) %>
        ], function (require) {

            const polyfill = require(<%= JSON.stringify(options.require) %>);
            
            
            <% if (typeof options.install === 'string') { %>
            
            const install = <%= options.install  %>;

            install(polyfill);

            <% } %>

            resolve();
        });
    })
}