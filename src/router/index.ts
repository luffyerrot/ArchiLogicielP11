/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/user'

const isServer = typeof window === 'undefined';

const router = createRouter({
  history: isServer ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    { path: '/home', redirect: '/' },
    { path: '/:pathMatch(.*)*', redirect: '/error404' }
  ],
})

router.beforeEach(to => {
  const user = useUserStore();
  if (!user.isLogged()) {
    if (to.name !== '/' && to.name !== '/Login' && to.name !== '/Register' && to.name !== '/Error404') {
      router.push('/login');
    }
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
