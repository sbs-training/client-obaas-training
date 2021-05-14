import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { appName } from '@/config'

Vue.use(Router)

const router = new Router({
  appName,
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
