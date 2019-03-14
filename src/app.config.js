// App-specific config

// Using CommonJS instead of ES2015+ export, because we also need to
// provide this object to Webpack in vue.config.js.
module.exports = {
  title: 'Vue Enterprise Boilerplate',
  description: '',
}


// https://github.com/chrisvfritz/vue-enterprise-boilerplate/tree/master/src/utils


  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
 // strict: process.env.NODE_ENV !== 'production',


// https://github.com/chrisvfritz/vue-enterprise-boilerplate/tree/master/src/state/modules