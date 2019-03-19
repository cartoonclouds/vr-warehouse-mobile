export default [
    {
        path: "/",
        name: "home",
        component: require("../pages/Main.vue").default,
    },
    {
        path: "/picking-orders/:id?",
        name: "picking-orders",
        component: () => import("../pages/PickingOrders.vue"),
        children: [{

            path: 'pick',
            name: "pick-order",
            props: true,
            component: require("../pages/PickingOrder.vue").default,
            beforeEnter(to, from, next) {

                $store.dispatch('PickingOrders/load', {id: to.params.id})
                    .then(() => {
                        next();
                    });

            }

        }]
    },

    {
        path: "/product-information",
        name: "product-information",
        component: () => import("../pages/ProductInformation.vue"),
    },

    {
        path: "/receiving",
        name: "receiving",
        component: () => import("../pages/Receiving.vue"),
    },
    {
        path: "/shipping",
        name: "shipping",
        component: () => import("../pages/Shipping.vue"),
    },
    {
        path: "/404",
        name: "404*",
        component: require("../pages/404.vue"),
        props: true,
    },
    {
        path: '*',
        redirect: '404',
    },
];