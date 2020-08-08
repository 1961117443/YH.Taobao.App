
import Layout from '@/layout'

const reportRouter = [
  {
    path: '/reports',
    component: Layout,
    name: 'Reports',
    meta: {
      title: '自定义报表',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'sales-profit',
        component: () => import('@/views/reports/sales-profit/list'),
        name: 'MonthSalesProfitList',
        meta: { title: '按月销售利润', icon: 'list' }
      }
    ]
  }
]
export default reportRouter
