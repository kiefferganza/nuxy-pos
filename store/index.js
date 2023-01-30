import { decrypt } from '~/js/utils/aes'

export const actions = {
  async nuxtServerInit({ commit }, { app, store }) {
    if (app.$cookies.get('user')) {
      const data = decrypt(
        app.$cookies.get('user'),
        this.app.$config.tokenEncryptionPhrase
      )
      // set temporary detail state for user
      await store.commit('auth/setUserDetails', JSON.parse(data))
      // refresh the tokens
      await store.dispatch('auth/refreshToken', JSON.parse(data))
      if (JSON.parse(data).roleId === 8) {
        await store.dispatch('auth/fetchMerchantDetails')
      }
      await store.dispatch(
        'roles/fetchRolePermissions',
        JSON.parse(data).roleId
      )
      await store.commit(
        'auth/setUserPermissions',
        store.state.roles.rolePermissions
      )
    }
  },
}
