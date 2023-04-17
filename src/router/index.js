import { createRouter, createWebHistory } from 'vue-router'

import Contact from '@/views/Contact.vue'
import ContactEdit from '@/views/ContactEdit.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Contact',
            component: Contact,
        },
        {
            path: '/edit/:id?',
            name: 'ContactEdit',
            component: ContactEdit,
        },
    ]
})


export default router