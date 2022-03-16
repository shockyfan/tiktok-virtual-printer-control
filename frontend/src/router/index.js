//import * as Vue from 'vue';
import { createRouter, createWebHashHistory  } from 'vue-router'

import Home from "../views/Home.vue";

// Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHashHistory (),
    // history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router