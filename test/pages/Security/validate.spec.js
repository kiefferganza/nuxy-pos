import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import Validate from '@/pages/security/validate'
import AuthValidate from '@/components/Auth/Validate/index'

const localVue = createLocalVue()
const $route = {
  path: '/validate',
  query: {
    type: '',
    method: '',
  },
}
localVue.use(Vuex)

describe('Validate Page', () => {
  let wrapper
  let stubs
  let actions
  let store
  let mocks

  beforeEach(() => {
    stubs = {
      AuthValidate,
      NuxtLink: RouterLinkStub,
    }

    mocks = {
      $route,
    }

    actions = {
      validate: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state: {
            validate: {
              busy: false,
              error: '',
            },
            person: {
              code: null,
              otp: null,
            },
          },
          actions,
        },
      },
    })

    wrapper = mount(Validate, {
      localVue,
      store,
      mocks,
      stubs,
    })
  })

  test('Shows Validate OTP Page', () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Has a AuthValidate component', () => {
    expect(wrapper.findComponent(AuthValidate)).toBeTruthy()
  })

  test('Call validate Method', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions.validate).toHaveBeenCalled()
  })
})
