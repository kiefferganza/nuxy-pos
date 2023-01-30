export default ({ app, store }, inject) => {
  inject('authorize', (permissionName = null) => {
    if (!permissionName) return true
    const permission = store.state.auth.permissions.find(
      ({ URL }) => URL === permissionName
    )
    return permission ? permission.Permission === 1 : false
  })
}
