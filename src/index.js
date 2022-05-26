import Router from './Router'
import AbstractView from './AbstractView'

const Controller = AbstractView


/**
 *
 * @param {object} options
 * @returns {{el}|*}
 */
function router (options)  {

    // default options
    const defaultOption = {
        el: options.el || document.querySelector('#app'),
        routes: [],
        async save(e){},
        async edit(e){},
        async destroy(e){},
        async logout(e){}
    };

        for (const defaultKey in defaultOption) {
            if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
                options[defaultKey] = defaultOption[defaultKey];
            }
        }


    const r = new Router({el: options.el, routes: options.routes});

   const { save,  edit, destroy, logout} = options


   window.addEventListener('DOMContentLoaded', () => {

        document.querySelectorAll('[ch-link]').forEach(el => {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                console.log(e.target.href)
                //debugger
                return r.navigateTo(e.target.href)
            })
        })

        document.body.addEventListener("click", async function (e) {

            if(e.target.matches("[ch-save]")){
                e.preventDefault();
                return await save(e.target)
            }

            if (e.target.matches("[ch-edit]")) {
                e.preventDefault();
                return await edit(e.target)
            }

            if (e.target.matches("[ch-destroy]")) {
                e.preventDefault();
                return await destroy(e.target)
            }

            if (e.target.matches("[ch-logout]")) {
                e.preventDefault();
                return await logout(e.target)
            }
        })
       r.router();
    })

    window.addEventListener("popstate", ()=>r.router());
    return options
}

window.router = router
window.Controller = Controller

export default {
    Controller,
    router
}



