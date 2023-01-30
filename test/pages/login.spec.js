import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import mutations from '../../store/auth/mutations'
import state from '../../store/auth/state'
import Login from '@/pages/login'
import AuthLogin from '@/components/Auth/login/index'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.directive('mask', jest.fn())

const logIn = jest.fn()
const logInComponentSpy = jest.spyOn(Login.methods, 'login')

describe('Login Page', () => {
  let stubs
  let actions
  let store

  beforeEach(() => {
    stubs = {
      AuthLogin,
      NuxtLink: RouterLinkStub,
    }

    actions = {
      logIn,
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

  test('Shows Login Page', () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      stubs,
    })
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Has a AuthLogin component', () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      stubs,
    })
    expect(wrapper.findComponent(AuthLogin)).toBeTruthy()
  })

  test('Call Login Method', async () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      stubs,
    })

    const loginComponent = wrapper.findComponent(AuthLogin)

    await loginComponent.vm.$emit('submit', {
      username: '09112930123',
      password: 'test',
    })

    await wrapper.vm.$nextTick()
    expect(logInComponentSpy).toHaveBeenCalled()
  })
})
