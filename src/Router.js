export default class {

    /**
     * @param {object} options
     */
    constructor(options){
        this.el = typeof options.el === 'object' ? options.el : document.querySelector(options.el)
        this.routes = options.routes
    }

    /**
     *
     * @param {string} url
     */
    navigateTo(url){
        history.pushState(null, null, url);
        this.router();
    }



    router(){
            // Test each route for potential match
        const potentialMatches = this.routes.map(route => {
            return {
                route: route,
                result: location.pathname.match(this.pathToRegex(route.path))
            };
        });

        let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

        if (!match) {
            match = {
                route: this.routes[0],
                result: [location.pathname]
            };
        }

        const view = new match.route.view(this.getParams(match));
        this.el.innerHTML =  view.getHtml();
    }

    /**
     *
     * @param {RegExpMatchArray} match
     */
    getParams(match){
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

        return Object.fromEntries(keys.map((key, i) => {
          return [key, values[i]];
        }));
    }

    /**
     *
     * @param {string} path
     */
    pathToRegex(path){
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }
}
