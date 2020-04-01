const routes = [{
    path: "/",
    component: () => import('pages/Index.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: 'hospital',
      component: () => import('pages/hospital.vue'),
      name: 'hospital'
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
