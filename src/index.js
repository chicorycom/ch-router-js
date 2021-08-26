import Router from './Router'
import AbstractView from './AbstractView'


/**
 *
 * @param {object} options
 */
const router = (options) => {
   // const _el = typeof options.el === 'object' ? options.el : document.querySelector(options.el)

   const r = new Router(options);

   window.addEventListener('DOMContentLoaded', () => {

        document.body.addEventListener("click", async function (e) {

            if (e.target.matches("[ch-link]")) {
                e.preventDefault();
                return r.navigate(e.target.href)
            }

            if (e.target.matches("[ch-delete]")) {
                e.preventDefault();
                return await options.deleting(e.target)
            }

            if(e.target.matches("[ch-save]")){
                e.preventDefault();
                return await options.saveEdit(e.target)

            }

            if (e.target.matches("[ch-edit]")) {
                e.preventDefault();
                return await options.edit(e.target)
            }

            if (e.target.matches("[ch-logout]")) {
                e.preventDefault();
                return await options.logout(e.target)
            }
        })

    })
}

export default {
    router,
    AbstractView
};


