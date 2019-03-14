/*
 * A VueJS mixin to provide the capability to set
 * each page's title in a SPA web app.
 * Modifications made by Chris Tudhope to use a default if
 * none defined.
 * Credits go to Evan You from his vue-hackernews-2.0 repo.
 * https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/util/title.js
*/
function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

export default {
  created() {
    const title = getTitle(this)
    if (title) {
      console.log(this.$options.name + ' ' + title);
      document.title = title
    }
  }
}