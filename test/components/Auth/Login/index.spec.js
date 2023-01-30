import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'

import AuthLogin from '~/components/Auth/Login/index'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'
import ForgotPasswordLink from '~/components/Auth/Login/components/ForgotPasswordLink'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AuthLogin', () => {
  let stubs, store, directives, username, password
  beforeEach(() => {
    username = '09123456789'
    password = '12345678'

    stubs = {
      AuthHeading,
      AlertComponent,
      FormGroup,
      FormInput,
      FormButton,
      ForgotPasswordLink,
      NuxtLink: RouterLinkStub,
    }

    directives = {
      mask: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state: {
            login: {
              busy: false,
              error: '',
            },
          },
          actions: {
            login: jest.fn(),
          },
        },
      },
    })
  })
  test('Show Login Component', () => {
    const wrapper = mount(AuthLogin, {
      localVue,
      store,
      stubs,
      directives,
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Submit Login Form', async () => {
    const wrapper = mount(AuthLogin, {
      localVue,
      store,
      stubs,
      directives,
    })
    await wrapper.find('#mobile-number').setValue(username)
    await wrapper.find('#password').setValue(password)
    await wrapper.vm.$nextTick()
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
