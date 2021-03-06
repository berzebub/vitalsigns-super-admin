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
      },
      {
        path: 'preference',
        component: () => import('pages/preference.vue'),
        name: 'preference'
      }, {
        path: 'mhospital/:hospitalKey',
        component: () => import('pages/mhospital.vue'),
        name: 'mhospital'
      }
    ]
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
