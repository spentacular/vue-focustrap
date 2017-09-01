import Vue from 'vue/dist/vue'
import { mount } from 'avoriaz'
import focustrap from '../src'

describe('focustrap', () => {
  it('It should be a function', () => {
    expect(typeof focustrap.created).toBe('function')
  })

  it('It should warn that no children are added', async () => {
    global.console.warn = jest.fn()
    const vm = new Vue(focustrap).$mount()
    await vm.$nextTick
    expect(global.console.warn).toHaveBeenCalledTimes(1)
    global.console.warn.mockReset()
  })

  it('It should warn that too many children are added', async () => {
    global.console.warn = jest.fn()
    const vm = new Vue({
      template: `<focustrap><div>1</div><div>2</div></focustrap>`,
      components: { focustrap }
    }).$mount()
    await vm.$nextTick
    expect(global.console.warn).toHaveBeenCalledTimes(1)
    global.console.warn.mockReset()
  })

  it('It mount component with no errors', async () => {
    global.console.warn = jest.fn()
    const vm = new Vue({
      template: `<focustrap><div>1</div></focustrap>`,
      components: { focustrap }
    }).$mount()
    await vm.$nextTick
    expect(vm.$el.outerHTML).toBe('<div>1</div>')
  })
})
