import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import mutations from '../../store/auth/mutations'
import state from '../../store/auth/state'
import ResetCredentials from '@/pages/reset-credentials'
import AuthResetCredentials from '@/components/Auth/ResetCredentials/index'

const localVue = createLocalVue()
localVue.directive('mask', jest.fn())

const generateOTP = jest.fn()
const resetCredentialComponentSpy = jest.spyOn(
  ResetCredentials.methods,
  'generateOTP'
)

const $route = {
  path: '/reset-credentials',
  query: {
    type: '',
  },
}

localVue.use(Vuex)

describe('Reset Credentials Page', () => {
  let stubs
  let actions
  let mocks
  let store

  beforeEach(() => {
    stubs = {
      AuthResetCredentials,
      NuxtLink: RouterLinkStub,
    }

    actions = {
      generateOTP,
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
    const wrapper = mount(ResetCredentials, {
      localVue,
      store,
      mocks,
      stubs,
    })
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Has a AuthReset component', () => {
    const wrapper = mount(ResetCredentials, {
      localVue,
      store,
      mocks,
      stubs,
    })
    expect(wrapper.findComponent(AuthResetCredentials)).toBeTruthy()
  })

  test('Call generateOTP Method', async () => {
    const wrapper = mount(ResetCredentials, {
      localVue,
      store,
      mocks,
      stubs,
    })

    const resetCredentialsComponent =
      wrapper.findComponent(AuthResetCredentials)

    await resetCredentialsComponent.vm.$emit('submit', {
      contactOptionId: '1',
      contactOptionValue: '09012903124',
    })

    await wrapper.vm.$nextTick()
    expect(resetCredentialComponentSpy).toHaveBeenCalled()
  })
})
