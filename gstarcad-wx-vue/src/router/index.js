import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Info from '@/pages/Info'
import UnBind from '@/pages/UnBind'
import Bind from '@/pages/Bind'
import Register from '@/pages/Register'
import Purse from '@/pages/Purse'
import Pool from '@/pages/purse/Pool'
import Welfare from '@/pages/purse/Welfare'
import Advanture from '@/components/Advanture'
import InvitePool from '@/pages/InvitePool'
import InvitedPool from '@/pages/InvitedPool'
import InviteFriend from '@/pages/InviteFriend'
import MyPool from '@/pages/MyPool'
import MyBook from '@/pages/MyBook'
import Invoice from '@/pages/Invoice'
import InvoiceManager from '@/pages/InvoiceManager'
import RelateInvoice from '@/pages/RelateInvoice'
import ApplyInvoice from '@/pages/ApplyInvoice'
import Auth from '@/pages/Auth'
import Pay from '@/pages/Pay'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'pay',
            component: Auth
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        },
        {
            path: '/unbind',
            name: 'Unbind',
            component: UnBind
        },
        {
            path: '/bind',
            name: 'Bind',
            component: Bind
        },
        {
            path: '/regist',
            name: 'Regist',
            component: Register
        },
        {
            path: '/purse',
            name: 'purse',
            component: Purse,
            children: [{
                    path: 'pool',
                    name: 'pool',
                    component: Pool
                },
                {
                    path: 'welfare',
                    name: 'welfare',
                    components: {
                        default: Welfare,
                        foot: Advanture
                    }
                }
            ]
        },
        {
            path: '/invite',
            name: 'invite',
            component: InvitePool
        },
        {
            path: '/invited/:groupId/:payGroupId',
            name: 'invited',
            component: InvitedPool
        },
        {
            path: '/invitedfriend',
            name: 'invitedfriend',
            component: InviteFriend
        },
        {
            path: '/mypool',
            name: 'mypool',
            component: MyPool
        },
        {
            path: '/mybook',
            name: 'mybook',
            component: MyBook
        },
        {
            path: '/invoice',
            name: 'invoice',
            component: Invoice
        },
        {
            path: '/invoicemanager',
            name: 'invoicemanager',
            component: InvoiceManager
        },
        {
            path: '/relateinvoice',
            name: 'relateinvoice',
            component: RelateInvoice
        },
        {
            path: '/applyinvoice',
            name: 'applyinvoice',
            component: ApplyInvoice
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/pay',
            name: 'pay',
            component: Pay
        }
    ]
})