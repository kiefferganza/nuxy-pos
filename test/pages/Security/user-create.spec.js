import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import UserCreate from '@/pages/security/user-create'
import AuthUserCreate from '@/components/Auth/UserCreate/index'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('User Create Page', () => {
  let wrapper
  let stubs
  let actions
  let store

  beforeEach(() => {
    stubs = {
      AuthUserCreate,
      NuxtLink: RouterLinkStub,
    }

    actions = {
      userCreate: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state: {
            userCreate: {
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

    wrapper = mount(UserCreate, {
      localVue,
      store,
      stubs,
    })
  })

  test('Shows Create User Page', () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Has a AuthUserCreate component', () => {
    expect(wrapper.findComponent(AuthUserCreate)).toBeTruthy()
  })

  test('Call createUser Method', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions.userCreate).toHaveBeenCalled()
  })
})
