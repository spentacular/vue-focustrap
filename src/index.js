import focustrap from './focustrap'

export function install(Vue) {
  Vue.component(focustrap.name, focustrap)
}

export default focustrap

// Autouse
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
