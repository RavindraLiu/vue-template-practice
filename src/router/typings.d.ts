import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    title?: string // 菜单路由title
    icon?: string // 路由菜单icon
    hidden?: boolean // 菜单不显示
    noCache?: boolean // 路由是否缓存, 没有这个属性或者false都不会缓存下来
    activeMenu?: string // 指定菜单激活
    breadcrumb?: boolean // 指定路由是否显示面包屑
    affix?: boolean // 固定显示在tagsView中
    alwaysShow?: boolean // 菜单是否一致显示跟路由
  }
}
