import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import LocationList from '@/pages/LocationList'
import LocationDetail from '@/pages/LocationDetail'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.use(Router)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDClncaGv1LsWxOUd6JJQ4ZOhQcFLnsK4k',
  },
  installComponents: true
});

Vue.use(VueClipboard)

const router = new Router({
  base: '/',
  mode: 'history',
  routes: [
    { 
      path: '/', 
      component: LocationList 
    },
    { 
      path: '/location/:id', 
      component: LocationDetail 
    }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
