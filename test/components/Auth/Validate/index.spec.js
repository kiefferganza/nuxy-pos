import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import Validate from '~/components/Auth/Validate/index.vue'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormButton from '~/components/Common/Inputs/FormButton'
import FormPinInput from '~/components/Common/Inputs/FormPinInput'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Validate', () => {
  let stubs
  let directives
  let store

  beforeEach(() => {
    stubs = {
      AuthHeading,
      FormPinInput,
      AlertComponent,
      FormButton,
    }
    directives = {
      mask: jest.fn(),
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
        },
      },
    })
  })

  test('Show Validate OTP Form', () => {
    const wrapper = mount(Validate, {
      localVue,
      store,
      stubs,
      directives,
    })

    expect(wrapper.isVisible()).toBe(true)
  })

  test('Submit Validate OTP Form', async () => {
    const wrapper = mount(Validate, {
      localVue,
      store,
      stubs,
      directives,
    })

    wrapper.find('.pin-input').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
