// NOTE 1: the router is internationalized
// When using the router-link element in the components
// you should prefer using the :to props with a named route
// so you do not need to prefix manually the locale
// If you need to use :to props with the path option,
// do not forget to get the locale from the route params and
// prefix your path with it

import { defaultLocale, locales } from '@/i18n'

import Home from '@/views/Home.vue'

const defaultPath = '/home'
const routes = [
  {
    path: defaultPath,
    name: 'Home',
    component: Home,
    meta: {
      translateKey: 'home.title'
    }
  },
  {
    path: '/error',
    name: 'Page not found',
    component: () => { return import('@/views/NotFound') },
    meta: {
      translateKey: 'pageNotFound.title'
    }
  },
  {
    path: '/*',
    redirect: to => {
      const requestedLocale = to.params.locale.toLowerCase()
      for (let i = 0; i < locales.length; i++) {
        if (locales[i].code.toLowerCase() === requestedLocale) {
          return `${to.params.locale}/error`
        }
      }
      return `/${defaultLocale}/error`
    }
  }
]

// prefix all routes with a locale param
for (let i = 0; i < routes.length; i++) {
  routes[i].path = `/:locale${routes[i].path}`
  routes[i].beforeEnter = (to, from, next) => {
    const requestedLocale = to.params.locale.toLowerCase()
    for (let i = 0; i < locales.length; i++) {
      if (locales[i].code.toLowerCase() === requestedLocale) {
        return next()
      }
    }
    next(`/${defaultLocale}/*`)
  }
}

// add global 'short' locale route and redirect to the default path
routes.unshift({
  path: '/:locale',
  beforeEnter: (to, from, next) => {
    next(`/${to.params.locale.toLowerCase()}${defaultPath}`)
  }
})

// add default global route and redirect to the default global 'short' locale route
routes.unshift({
  path: '/',
  redirect: `/${defaultLocale}${defaultPath}`
})

export default routes
