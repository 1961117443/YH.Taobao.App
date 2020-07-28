
import Layout from '@/layout'

const productRouter = [
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'Product',
    meta: {
      title: '货品档案',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/product/create'),
        name: 'CreateProduct',
        meta: { title: '添加货品', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/product/edit'),
        name: 'EditProduct',
        meta: { title: '修改货品', noCache: true, activeMenu: '/product/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/product/list'),
        name: 'ProductList',
        meta: { title: '货品列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/bom-file',
    component: Layout,
    redirect: '/bom-file/list',
    name: 'BOM File',
    meta: {
      title: '物料清单',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/bom-file/create'),
        name: 'CreateBOMFile',
        meta: { title: '添加清单', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/bom-file/edit'),
        name: 'EditBOMFile',
        meta: { title: '修改清单', noCache: true, activeMenu: '/bom-file/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/bom-file/list'),
        name: 'BOMFileList',
        meta: { title: '清单列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/purchase-in',
    component: Layout,
    redirect: '/purchase-in/list',
    name: 'PurchaseIn',
    meta: {
      title: '采购入库',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/purchase-in/create'),
        name: 'CreatePurchaseIn',
        meta: { title: '新增入库单', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/purchase-in/edit'),
        name: 'EditPurchaseIn',
        meta: { title: '修改入库单', noCache: true, activeMenu: '/purchase-in/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/purchase-in/list'),
        name: 'PurchaseInList',
        meta: { title: '入库单列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/sales-out',
    component: Layout,
    redirect: '/sales-out/list',
    name: 'SalesOut',
    meta: {
      title: '销售出库',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/sales-out/create'),
        name: 'CreateSalesOut',
        meta: { title: '新增销售出库单', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/sales-out/edit'),
        name: 'EditSalesOut',
        meta: { title: '修改销售出库单', noCache: true, activeMenu: '/sales-out/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/sales-out/list'),
        name: 'SalesOutList',
        meta: { title: '销售出库单列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/other-out',
    component: Layout,
    redirect: '/other-out/list',
    name: 'OtherOut',
    meta: {
      title: '领用出库',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/other-out/create'),
        name: 'CreateOtherOut',
        meta: { title: '新增领用出库单', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/other-out/edit'),
        name: 'EditOtherOut',
        meta: { title: '修改领用出库单', noCache: true, activeMenu: '/other-out/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/other-out/list'),
        name: 'OtherOutList',
        meta: { title: '领用出库单列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/other-in',
    component: Layout,
    redirect: '/other-in/list',
    name: 'OtherIn',
    meta: {
      title: '生产入库',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/other-in/create'),
        name: 'CreateOtherIn',
        meta: { title: '新增生产入库单', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/other-in/edit'),
        name: 'EditOtherIn',
        meta: { title: '修改生产入库单', noCache: true, activeMenu: '/other-in/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/other-in/list'),
        name: 'OtherInList',
        meta: { title: '生产入库单列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/bom-complete',
    component: Layout,
    redirect: '/bom-complete/list',
    name: 'BOMComplete',
    meta: {
      title: '产成品',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/bom-complete/create'),
        name: 'CreateBOMComplete',
        meta: { title: '新增完工单', icon: 'edit' }
      },
      {
        // path: 'edit/:id(\\d+)',
        path: 'edit/:id',
        component: () => import('@/views/bom-complete/edit'),
        name: 'EditBOMComplete',
        meta: { title: '修改完工单', noCache: true, activeMenu: '/bom-complete/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/bom-complete/list'),
        name: 'BOMCompleteList',
        meta: { title: '完工单列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/product-stock',
    component: Layout,
    redirect: '/product-stock/list',
    name: 'ProductStock',
    meta: {
      title: '材料库存',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product-stock/list'),
        name: 'ProductStockList',
        meta: { title: '材料库存', icon: 'list' }
      }
    ]
  }
]

export default productRouter
