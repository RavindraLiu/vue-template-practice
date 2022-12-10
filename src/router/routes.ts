import { RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout, // 布局组件作为一级路由
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation",
          icon: "documentation",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System",
      icon: "lock"
    },
    children: [
      {
        path: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/menu.vue"),
        meta: {
          title: "Menu Management",
          hidden: true
        }
      },
      {
        path: "role",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/system/role.vue"),
        meta: {
          title: "Role Management"
        }
      },
      {
        path: "user",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management"
        }
      }
    ]
  },
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "http://www.zhufengpeixun.com",
        redirect: "/",
        meta: {
          title: "External Link",
          icon: "link"
        }
      }
    ]
  }
]

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "dashboard",
          icon: "dashboard"
        }
      }
    ]
  }
]
const routes = [...constantRoutes, ...asyncRoutes]
export default routes
