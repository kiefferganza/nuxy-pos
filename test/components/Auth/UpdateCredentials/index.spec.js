import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import UpdateCredentials from '~/components/Auth/UpdateCredentials/index'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'

const localVue = createLocalVue()
const $route = {
  path: '/reset-credentials',
  query: {
    type: 'password',
  },
}

localVue.use(Vuex)

describe('UpdateCredentials', () => {
  let stubs, store, directives, password
  beforeEach(() => {
    password = '09123456789'

    stubs = {
      AuthHeading,
      AlertComponent,
      FormGroup,
      FormInput,
      FormButton,
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
            credential: {
              busy: false,
              error: '',
            },
            person: {
              code: null,
              otp: null,
            },
          },
          actions: {
            login: jest.fn(),
          },
        },
      },
    })
  })
  test('Show Update Credentials Component', () => {
    const wrapper = mount(UpdateCredentials, {
      localVue,
      mocks: {
        $route,
      },
      store,
      stubs,
      directives,
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Submit Update Credentials Form', async () => {
    const wrapper = mount(UpdateCredentials, {
      localVue,
      mocks: {
        $route,
      },
      computed: {
        title: () => 'Password',
      },
      store,
      stubs,
      directives,
    })
    await wrapper.find('#Password').setValue(password)
    await wrapper.vm.$nextTick()
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
