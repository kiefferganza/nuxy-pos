import { SIDEBAR_ITEMS } from '@/js/constants/sidebar-items'
export default function ({ store, redirect, route }) {
  const permission =
    store.state.auth.permissions.find(
      ({ URL }) => URL === route.meta[0].permissionURL
    ).Permission === 1
  if (!permission) {
    let path = ''
    SIDEBAR_ITEMS.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (
            store.state.auth.permissions.find(
              ({ URL }) => URL === child.permissionURL
            ).Permission === 1
          ) {
            if (!path) {
              path = child.to
            }
          }
        })
      }
      if (item.permissionURL) {
        if (
          store.state.auth.permissions.find(
            ({ URL }) => URL === item.permissionURL
          ).Permission === 1
        ) {
          if (!path) {
            path = item.to
          }
        }
      }
    })
    redirect(path)
  }
}
