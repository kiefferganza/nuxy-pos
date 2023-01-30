import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import ResetCredentials from '~/components/Auth/ResetCredentials/index'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'

const localVue = createLocalVue()
const $route = {
  path: '/reset-credentials',
  query: {
    type: '',
  },
}

localVue.use(Vuex)

describe('ResetCredentials', () => {
  let stubs, store, directives, mobileNum
  beforeEach(() => {
    mobileNum = '09123456789'

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
            otp: {
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
  test('Show Reset Credentials Component', () => {
    const wrapper = mount(ResetCredentials, {
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

  test('Submit Reset Credentials Form', async () => {
    const wrapper = mount(ResetCredentials, {
      localVue,
      mocks: {
        $route,
      },
      store,
      stubs,
      directives,
    })
    await wrapper.find('#mobile-number').setValue(mobileNum)
    await wrapper.vm.$nextTick()
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
