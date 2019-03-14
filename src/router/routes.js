export default [
    {
        path: "/",
        name: "home",
        component: require("../pages/Main.vue").default,
    },
    {
        path: "/picking-orders/pick/:id",
        name: "pick-order",
        component: () => import("../pages/PickingOrder.vue"),
        props: true,
        meta: {
            title: "Picking this order"
        },
    },
    {
        path: "/picking-orders/",
        name: "picking-orders",
        component: () => import("../pages/PickingOrders.vue"),
        meta: {
            title: "Pick Me Some More Orders"
        }
    },
    {
        path: "/product-information",
        name: "product-information",
        component: () => import("../pages/ProductInformation.vue"),
        meta: {
            title: "P-I"
        }
    },

    {
        path: "/receiving",
        name: "receiving",
        component: () => import("../pages/Receiving.vue"),
        meta: {
            title: "Rec."
        }
    },
    {
        path: "/shipping",
        name: "shipping",
        component: () => import("../pages/Shipping.vue"),
        meta: {
            title: "Shipping the Orders"
        }
    },
    {
        path: "/404",
        name: "404*",
        component: require("../pages/404.vue"),
        props: true,
        meta: {
            title: "Oh Damn! All wrong!"
        }
    },
    {
        path: '*',
        redirect: '404',
    },
];