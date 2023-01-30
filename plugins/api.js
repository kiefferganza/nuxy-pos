import AES256 from 'aes-everywhere'

export default function (
  {
    $toast,
    $axios,
    $config: { encryption, appID },
    store,
    route,
    $cookies,
    redirect,
  },
  inject
) {
  // Create a custom axios instance
  const api = $axios.create({
    transformRequest: [
      (data) => {
        if (!data) {
          return data
        }
        const transformedPayload = JSON.stringify({
          ...JSON.parse(data),
          applicationId: appID,
        })
        const encryptedData = encryption
          ? AES256.encrypt(transformedPayload, 'PASSWORD')
          : transformedPayload
        return encryptedData
      },
      ...$axios.defaults.transformRequest,
    ],
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalConfig = error.config
      originalConfig._retry = false
      if (originalConfig.url === 'auth/refresh-token' && error.response) {
        await $cookies.removeAll()
        await store.commit('auth/setUserDetails', {})
        redirect('/login')
        return Promise.reject(error)
      }
      if (originalConfig.url !== '/auth/login' && error.response) {
        // Access Token was expired
        if (error.response.status === 401) {
          try {
            await store.dispatch('auth/refreshToken', store.state.auth.user)
            error.config.headers.Authorization = `Bearer ${store.state.auth.user.accessToken}`
            if (store.state.auth.user.accessToken) {
              return await api.request(error.config)
            }
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(error)
    }
  )
  // Inject to context as $api
  inject('api', api)
}
