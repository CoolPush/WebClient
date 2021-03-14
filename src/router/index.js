import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/docs',
        name: 'Docs',
        component: () => import('../views/Docs.vue')
    },
    {
        path: '/callback',
        name: 'Callback',
        component: () => import('../views/Callback.vue')
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    },
    {
        path: '/deploy',
        name: 'Deploy',
        component: () => import('../views/Deploy.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/feat',
        name: 'Feat',
        component: () => import('../views/Feature.vue')
    },
    {
        path: '/proxy',
        name: 'Proxy',
        component: () => import('../views/Proxy.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
