import { mount } from '@vue/test-utils'
import { expect, test, describe } from '@jest/globals'
import FormGroup from '~/components/Common/FormGroup'

describe('Form Group', () => {
  test('Shows Form Group', () => {
    const wrapper = mount(FormGroup)
    expect(wrapper.isVisible()).toBe(true)
  })
  test('Shows Form Group Label', () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        label: 'test',
      },
    })
    expect(wrapper.text()).toBe('test')
  })
  test('Shows Form Group Label For for label element', () => {
    const wrapper = mount(FormGroup, {
      propsData: {
        labelFor: 'test',
      },
    })
    const label = wrapper.get('label')
    expect(label.attributes('for')).toBe('test')
  })
  test('Shows Form Group slot element', () => {
    const wrapper = mount(FormGroup, {
      slots: {
        default: '<div class="test-element">test</div>',
      },
    })
    const element = wrapper.get('div.test-element')
    expect(element.exists()).toBe(true)
  })
})
