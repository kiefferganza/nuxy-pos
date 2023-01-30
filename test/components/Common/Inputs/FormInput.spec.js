import { mount } from '@vue/test-utils'
import { expect, test, describe } from '@jest/globals'
import FormInput from '~/components/Common/Inputs/FormInput'

describe('Form Input', () => {
  test('Shows Form Input', () => {
    const wrapper = mount(FormInput)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Shows Form Input value when value prop is present', async () => {
    const wrapper = mount(FormInput)
    const input = wrapper.find('input')
    await wrapper.setProps({ value: 'text value' })
    expect(input.element.value).toBe('text value')
  })

  test('emits input event when input value is changed', async () => {
    const wrapper = mount(FormInput)
    const input = wrapper.find('input')
    input.element.value = 'text input'

    await input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0].length).toBe(1)
    expect(wrapper.emitted().input[0][0]).toBe('text input')
  })
})
