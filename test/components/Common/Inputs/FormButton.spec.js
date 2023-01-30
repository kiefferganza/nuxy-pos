import { mount } from '@vue/test-utils'
import { expect, test, describe } from '@jest/globals'
import FormButton from '~/components/Common/Inputs/FormButton'
// import FaIcon from '~/components/Common/FaIcon'

describe('FormButton', () => {
  test('Shows Form Button', () => {
    const wrapper = mount(FormButton)
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Shows Form Button with text', () => {
    const wrapper = mount(FormButton)
    const btn = wrapper.find('button')
    btn.element.textContent = 'Test'
    expect(wrapper.text()).toBe('Test')
  })

  test('Form Button triggers a click', async () => {
    const wrapper = mount(FormButton)

    await wrapper.find('button').trigger('click')
  })

  test('Form Button triggers a click with text', async () => {
    const wrapper = mount(FormButton)
    const btn = wrapper.find('button')
    btn.element.textContent = 'Test'

    await wrapper.find('button').trigger('click')
  })

  test('Form Button is busy', async () => {
    const wrapper = mount(FormButton, {
      propsData: {
        busy: false,
      },
    })
    
    expect(wrapper.props().busy).not.toBe(true)

    await wrapper.find('button').trigger('click')
    await wrapper.setProps({ busy: true })

    expect(wrapper.props().busy).toBe(true)

  })
})
