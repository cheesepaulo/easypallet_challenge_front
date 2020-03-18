import Vue from 'vue'
import axios from 'axios'

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:3000/api/v1'
    })
  }
})