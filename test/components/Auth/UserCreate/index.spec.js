import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import UserCreate from '~/components/Auth/UserCreate/index.vue'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'

const localVue = createLocalVue()

localVue.use(Vuex)

// create test case for creating a user
describe('UserCreate', () => {
  let stubs
  let directives
  let store
  let pincode
  let pincodeConfirm
  let password
  let passwordConfirm

  beforeEach(() => {
    pincode = '123456'
    pincodeConfirm = '123456'
    password = '123456'
    passwordConfirm = '123456'

    stubs = {
      NuxtLink: RouterLinkStub,
      AuthHeading,
      AlertComponent,
      FormInput,
      FormGroup,
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
            userCreate: {
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

  test('Show User Create Form', () => {
    const wrapper = mount(UserCreate, {
      localVue,
      stubs,
      directives,
      store,
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Submit User Create Form', async () => {
    const wrapper = mount(UserCreate, {
      localVue,
      stubs,
      directives,
      store,
      data: () => ({
        pincode,
        pincodeConfirm,
        password,
        passwordConfirm,
      }),
    })
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(pincode).toBe(pincodeConfirm)
    expect(password).toBe(passwordConfirm)
    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
