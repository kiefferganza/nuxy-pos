import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import { describe, test, expect, beforeEach, jest } from '@jest/globals'
import Vuex from 'vuex'
import AuthRegister from '~/components/Auth/Register/index'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AuthRegister', () => {
  let stubs, store, directives, username
  beforeEach(() => {
    username = '09123456789'

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
            register: {
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
  test('Show Register Component', () => {
    const wrapper = mount(AuthRegister, {
      localVue,
      store,
      stubs,
      directives,
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Submit Register Form', async () => {
    const wrapper = mount(AuthRegister, {
      localVue,
      store,
      stubs,
      directives,
    })
    await wrapper.find('#mobile-number').setValue(username)
    await wrapper.vm.$nextTick()
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
