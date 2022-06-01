Your Security System Network Integrator. [Chicorycom][website] 👋

# ch-router-js

🍭 Wow, such a lovely router frontend web site
    export NODE_OPTIONS=--openssl-legacy-provider 

## Installation

Using npm:

```
npm install ch-router-js --save
```

Using Yarn:

```
yarn add ch-router-js
```

Work with module bundler:

## Quick Start

```js
import {router, Controller} from 'ch-router-js'


class Dashboard extends Controller {
    /**
     *
     * @param params
     */
    constructor(params) {
        super(params);
        this.setTitle("Dashboard"); 
    }

    /**
     *
     * @returns {string<innerHTML>}
     */
    getHtml() {
        return this.view(`<template><h1>test</h1></template>`);
    }
}


class About extends Controller {
    /**
     *
     * @param params
     */
    constructor(params) {
        super(params);
        //default title: slug
    }

    /**
     * 
     * @returns {Promise<*>}
     */
  async  getHtml() {
        const response = await this.get('/pages/dashboard')
        return this.view(response);
    }
}


const routes = [
    { path: "/", view: Dashboard },
    { path: "/about", view: About },
    { path: "/post/:slug", view: About }
]

const el = document.createElement('div')
document.body.prepend(el)

or 

const el = document.querySelector(selected)

const options = {
    el: el || selected,
    routes
}

router(options)

```

## Options

Name | Default | Description
----|-------|----
el | document.querySelector('.ch-router-js') | binding element
routes | array object | route for page, [see more details](https://chicorycom.net)
save | `function` | selected html element attribute ch-save
edit | `function` | selected html element attribute ch-edit
destroy | `function` | selected html element attribute ch-destroy
logout | `function` | selected html element attribute ch-logout

For example:


### Template page html or blade or ejs or twig ...

`Template sent by the serve`

```html
<template>
    <div class="__card-shadow-heading">
        <span class="__card-shadow-heading-action">
            <a class="list-toolbar-btn" href="#" title="configure">
                <i class="fas fa-cog"></i>
            </a>
            <a class="list-toolbar-btn" href="#" title="refresh">
                <i class="fas fa-sync-alt"></i>
            </a>
        </span>
    </div>
</template>
<script >
    //TODO script 
</script>
<style>
    /** TODO style **/
</style>
```

### HTML page

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<nav>
  <a href="/" ch-link> Home page </a><br>
  <a href="/about" ch-link> About </a><br>
  <a href="/post/title-post-1" ch-link> single post </a><br>
  
  <button  ch-save> Save form </button>
  <button  ch-edit> edit form </button>
  <button  ch-destroy> delete  </button>
  <br>
  <button  ch-logout>logout </button>
</nav>
<div id="app"></div>
<script  src="/main.js"></script>
</body>
</html>
```

### main.js | Javascript script
```js
const opt = {
  el,
  routes,
  /**
   *
   * @param e
   * @returns {Promise<void>}
   */
  async destroy(el) {
    const res = await fetch(el.dataset.action, {
      method: 'DELETE'
    })
    if(res.status === 204){
      Success('Deleted!')
    }
  },

  /**
   *
   * @param e
   * @returns {Promise<void>}
   */
  async logout(el){
    const auth = await JSON.parse(localStorage.getItem('auth')) || {}
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + auth.token)
    const response = await fetch('/logout', { method: 'POST', headers })

    if(response.status >= 200 && response.status < 300){
      location.href = '/'
    }
  }
}

opt.save = async (el) => {
  const parent = el.parentNode.parentNode
  const li = parent.querySelectorAll('.edited')
  const body = {}

  await li.forEach(  element => {
    body[element.dataset.collum] = element.textContent.trim()
    element.removeAttribute('contentEditable')
  })
  if(JSON.stringify(bodyOld) !== JSON.stringify(body)){
    const res = await fetch(el.dataset.action, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content
      },
      body: JSON.stringify(body)
    })
    if(res.status >= 300){
      alert(`Internal Server Error... code: ${res.status}`, '', 'error')
    }
  }

  el.innerHTML = ` <i class="fa fa-edit"></i> edit`
  el.removeAttribute.remove('ch-save')
  el.setAttribute('ch-edit', '')
  return el
}

opt.edit =  (el) => {
  const parent = el.parentNode.parentNode

  const li = parent.querySelectorAll('.edited')

  li.forEach(element => {
    element.setAttribute('contentEditable', 'true')
    bodyOld[element.dataset.collum] = element.textContent.trim()
  })

  li[0].focus()

  el.innerHTML = `<i class="far fa-save"></i> Save`
  el.removeAttribute('ch-edit')
  el.setAttribute('ch-save', '')
  return el
}

router(opt)

```

## API

+ `opt.save()`: callback
+ `opt.edit()`: callback
+ `opt.destroy()`: callback
+ `opt.logout()`: callback

[website]: https://chicorycom.net
