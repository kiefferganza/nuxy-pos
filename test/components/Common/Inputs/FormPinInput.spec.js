import { mount } from '@vue/test-utils'
import { expect, test, describe, beforeEach, jest } from '@jest/globals'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormPinInput from '~/components/Common/Inputs/FormPinInput'

describe('Form Input', () => {
  let stubs, directives
  beforeEach(() => {
    directives = {
      mask: jest.fn(),
    }
    stubs = {
      FormInput,
    }
  })
  test('Shows Form Input', () => {
    const wrapper = mount(FormPinInput, {
      directives,
      stubs,
    })
    expect(wrapper.isVisible()).toBe(true)
  })
  test('Pressing backspace on first input clears input and doesnt shift to other inputs', async () => {
    const wrapper = mount(FormPinInput, {
      directives,
      stubs,
      attachTo: document.body,
    })
    const inputs = wrapper.findAllComponents(FormInput)
    const textInput = inputs.at(0).find('input')
    textInput.element.value = ''
    await textInput.trigger('focus')
    await textInput.vm.$emit('input')
    await textInput.vm.$emit('keyup', {
      keyCode: 8,
      preventDefault: jest.fn(),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toBe('')
    expect(inputs.at(0).find('input').element).toStrictEqual(
      document.activeElement
    )
  })
  test('Pressing backspace clears input and shifts back to previous input', async () => {
    const wrapper = mount(FormPinInput, {
      directives,
      stubs,
      attachTo: document.body,
    })
    const inputs = wrapper.findAllComponents(FormInput)
    const textInput = inputs.at(1).find('input')
    textInput.element.value = ''
    await textInput.trigger('focus')
    await textInput.vm.$emit('input')
    await textInput.vm.$emit('keyup', {
      keyCode: 49,
      preventDefault: jest.fn(),
    })
    await wrapper.vm.$nextTick()

    textInput.element.value = ''
    await textInput.trigger('focus')
    await textInput.vm.$emit('input')
    await textInput.vm.$emit('keyup', {
      keyCode: 8,
      preventDefault: jest.fn(),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toBe('')
    expect(inputs.at(0).find('input').element).toStrictEqual(
      document.activeElement
    )
  })
  test('Pressing a number emits input and shifts focus to next input', async () => {
    const wrapper = mount(FormPinInput, {
      directives,
      stubs,
      attachTo: document.body,
    })
    const inputs = wrapper.findAllComponents(FormInput)
    const textInput = inputs.at(0).find('input')
    textInput.element.value = '1'
    await textInput.trigger('focus')
    await textInput.vm.$emit('input')
    await textInput.vm.$emit('keyup', {
      keyCode: 49,
      preventDefault: jest.fn(),
    })
    // await wrapper.vm.emitValue()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0].length).toBe(1)
    expect(wrapper.emitted().input[0][0]).toBe('1')
    expect(inputs.at(1).find('input').element).toStrictEqual(
      document.activeElement
    )
  })
  test('Pressing a non numeric character doesnt do an input', async () => {
    const wrapper = mount(FormPinInput, {
      directives,
      stubs,
      attachTo: document.body,
    })
    const inputs = wrapper.findAllComponents(FormInput)
    const textInput = inputs.at(0).find('input')
    await textInput.trigger('focus')
    await textInput.vm.$emit('input')
    await textInput.vm.$emit('keyup', {
      keyCode: 83,
      preventDefault: jest.fn(),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0].length).toBe(1)
    expect(wrapper.emitted().input[0][0]).toBe('1')
  })
  test('Pressing a number on last input does not shift on other inputs', async () => {
    const wrapper = mount(FormPinInput, {
      directives,
      stubs,
    })
    const inputs = wrapper.findAllComponents(FormInput)
    const textInput = inputs.at(5).find('input')
    textInput.element.value = '1'
    await textInput.trigger('focus')
    await textInput.vm.$emit('input')
    await textInput.vm.$emit('keyup', {
      keyCode: 49,
      key: '1',
      preventDefault: jest.fn(),
    })
    // await wrapper.vm.emitValue()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputs.length).toBe(1)
    // expect(wrapper.emitted().input).toBeTruthy()
    // expect(wrapper.emitted().input.length).toBe(1)
    // expect(wrapper.emitted().input[0].length).toBe(1)
    // expect(wrapper.emitted().input[0][0]).toBe('1')
  })
})
