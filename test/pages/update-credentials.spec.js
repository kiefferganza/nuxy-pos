import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import mutations from '../../store/auth/mutations'
import state from '../../store/auth/state'
import UpdateCredentials from '@/pages/update-credentials'
import AuthUpdateCredentials from '@/components/Auth/UpdateCredentials/index'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.directive('mask', jest.fn())

const updateCredentials = jest.fn()
const updateCredentialsComponentSpy = jest.spyOn(
  UpdateCredentials.methods,
  'updateCredentials'
)

const $route = {
  path: '/update-credentials',
  query: {
    type: '',
  },
}

describe('Update Credentials Page', () => {
  let stubs
  let actions
  let mocks
  let store

  beforeEach(() => {
    stubs = {
      AuthUpdateCredentials,
      NuxtLink: RouterLinkStub,
    }

    actions = {
      updateCredentials,
    }

    mocks = {
      $route,
    }

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state,
          mutations,
          actions,
        },
      },
    })
  })

  test('Shows Reset Credentials Page', () => {
    const wrapper = mount(UpdateCredentials, {
      localVue,
      store,
      mocks,
      stubs,
    })
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Has a AuthUpdate component', () => {
    const wrapper = mount(UpdateCredentials, {
      localVue,
      store,
      mocks,
      stubs,
    })
    expect(wrapper.findComponent(AuthUpdateCredentials)).toBeTruthy()
  })

  test('Call generateOTP Method', async () => {
    const wrapper = mount(UpdateCredentials, {
      localVue,
      store,
      mocks,
      stubs,
    })
    const payload = {
      newPassword: 'newPassword',
      newPasswordConfirm: 'newPasswordConfirm',
    }
    const updateCredentialsComponent = wrapper.findComponent(
      AuthUpdateCredentials
    )

    await updateCredentialsComponent.vm.$emit('submit', {
      personCode: 'test123',
      payload,
    })

    await wrapper.vm.$nextTick()
    expect(updateCredentialsComponentSpy).toHaveBeenCalled()
  })
})
