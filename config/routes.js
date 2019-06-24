export default [
    // {
    //     path: '/',
    //     redirect: '/home',
    //     component: () => import('../src/test/test.vue'),
    // },
    // {
    //     path: '/home',
    //     component: () => import('../src/test/test.vue'),
    //     name: 'home'
    // },
    {
        path: '/',
        redirect: '/sign'
    },
    {
        path: '/sign',
        component: () => import('../src/view/login/sign.vue')
    },
    {
        path: '/home',
        redirect: '/home/main',
        component: () => import('../src/app.vue'),
        children: [
            {
                path: 'dispatch',
                redirect: '/home/dispatch/index',
                component: () => import('../src/view/dispatch/dispatch.vue'),
                children: [
                    {
                        path: 'index',
                        component: () => import('../src/test/test.vue')
                    },
                    {
                        path: 'posts',
                        name: 'posts',
                        component: () => import('../src/view/dispatch/dispatch-propose.vue'),
                    },
                    {
                        path: 'dueout',
                        name: 'dueout',
                        component: () => import('../src/view/dispatch/dispatch-dueout.vue')
                    },
                    {
                        path: 'processing',
                        name: 'processing',
                        component: () => import('../src/view/dispatch/dispatch-processing.vue')
                    },
                    {
                        path: 'approval',
                        name: 'approval',
                        component: () => import('../src/view/dispatch/dispatch-approval.vue')
                    },
                    {
                        path: 'sign',
                        name: 'sign',
                        component: () => import('../src/view/dispatch/dispatch-sign.vue')
                    },
                    {
                        path: 'read',
                        name: 'read',
                        component: () => import('../src/view/dispatch/dispatch-onPass.vue')
                    },
                    {
                        path: 'secondapproval',
                        name: 'secondApproval',
                        component: () => import('../src/view/dispatch/dispatch-secondApproval.vue')
                    },
                    {
                        path: 'done',
                        name: 'done',
                        component: () => import('../src/view/dispatch/dispatch-done.vue')
                    }
                ]
            },
            {
                path: 'receive',
                redirect: '/home/receive/index',
                component: () => import('../src/view/receive/receive.vue'),
                children: [
                    {
                        path: 'index',
                        component: () => import('../src/test/test.vue')
                    },
                    {
                        path: 'posts',
                        name: 'receivePosts',
                        component: () => import('../src/view/receive/receive-propose.vue'),
                    },
                    {
                        path: 'dueout',
                        name: 'receiveDueout',
                        component: () => import('../src/view/receive/receive-dueout.vue')
                    },
                    {
                        path: 'processing',
                        name: 'receiveProcessing',
                        component: () => import('../src/view/receive/receive-processing.vue')
                    },
                    {
                        path: 'approval',
                        name: 'receiveApproval',
                        component: () => import('../src/view/receive/receive-approval.vue')
                    },
                    {
                        path: 'sign',
                        name: 'receiveSign',
                        component: () => import('../src/view/receive/receive-sign.vue')
                    },
                    {
                        path: 'read',
                        name: 'receiveRead',
                        component: () => import('../src/view/receive/receive-onPass.vue')
                    },
                    {
                        path: 'secondapproval',
                        name: 'receiveSecondApproval',
                        component: () => import('../src/view/receive/receive-secondApproval.vue')
                    },
                    {
                        path: 'done',
                        name: 'receiveDone',
                        component: () => import('../src/view/receive/receive-done.vue')
                    }
                ]
            },
            {
                path: 'check',
                component: () => import('../src/view/schedule/checkRate.vue')
            },
            {
                path: 'done',
                component: () => import('../src/view/done/completed.vue')
            },
            // {
            //     path: 'info',
            //     component: () => import('../src/view/info/personMsg.vue')
            // },
            {
                path: 'main',
                component: () => import('../src/view/home/personWork.vue')
            }
        ]
    },

    // {
    //     path: '*',
    //     component: () => import('../src/test/test.vue')
    // }
]