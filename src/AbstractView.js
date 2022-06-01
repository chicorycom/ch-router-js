String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  export default class {
    constructor(params) {
      this.params = params;
      this.title = location.pathname.substring(1) || '';
      this.response = `<template></template>`;
    }

    /**
     *
     * @param {string} title
     * @param {string} icon
     * @param {string} page
     */
    setTitle(title, icon='') {
          document.title = title.capitalize();
    }

    /**
     * 
     * @returns {Promise<*>}
     */
     async  getHtml() {
        const response = await this.get(this.params.slug || '/')
        return this.view(response);
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<*>}
     */
    async get(url){
      return await fetch(url).then(re => re.text())
    }

    /**
     *
     * @param {string} response
     * @returns {string<innerHTML>}
     */
    view(response){
      let template = document.createElement('div');
      template.innerHTML = response;
      const script_element = template.getElementsByTagName("script");
      const scripts = Array.prototype.slice.call(script_element)
      const style_element = template.getElementsByTagName("style");
      const styles = Array.prototype.slice.call(style_element)
      const header = document.head
      const body = document.body

      const taskTemplate = template.getElementsByTagName('template')[0];
      template = taskTemplate ? taskTemplate : template;
      const clone = taskTemplate ? document.importNode(template.content, true) : template;


      /*if(scripts.length > 0 && template) {
        scripts.forEach(script => {
          header.appendChild(script);
        })
      }*/

      if(styles.length > 0 && template) {
        styles.forEach(style => {
          header.appendChild(style);
        })
      }

      if(scripts.length > 0 && template) {
          scripts.forEach(script => {
            body.appendChild(script);
          })
      }

      template.appendChild(clone.cloneNode(true));

      return template.innerHTML
    }
  }
