import { mount } from '@vue/test-utils'
import { expect, test, describe } from '@jest/globals'
import AlertComponent from '~/components/Common/AlertComponent'

describe('Alert Component', () => {
  test('Shows Alert Component', () => {
    const wrapper = mount(AlertComponent)
    expect(wrapper.isVisible()).toBe(true)
  })
  test('Adding error variant adds its respective variant class', () => {
    const wrapper = mount(AlertComponent, {
      propsData: {
        variant: 'danger',
      },
    })
    expect(wrapper.classes('alert__danger')).toBe(true)
  })
  test('Adding success variant adds its respective variant class', () => {
    const wrapper = mount(AlertComponent, {
      propsData: {
        variant: 'success',
      },
    })
    expect(wrapper.classes('alert__success')).toBe(true)
  })
  test('Adding no variant adds default variant class', () => {
    const wrapper = mount(AlertComponent, {
      propsData: {
        variant: '',
      },
    })
    expect(wrapper.classes('alert__primary')).toBe(true)
  })
})
