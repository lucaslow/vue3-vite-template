import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('@/views/Home.vue'),
        meta: {
            auth: false
        }
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})