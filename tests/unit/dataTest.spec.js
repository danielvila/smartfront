import { shallowMount } from '@vue/test-utils'
import { provide } from "vue";
import Form from '@/components/clients/Form.vue'

describe('Testing integrity of data() properties', () => {
  it('should have name property', () => {
    const wrapper = shallowMount(Form)
    const clients = []
    provide('clients', clients)
    expect(wrapper.vm.$data).toHaveProperty('textinsertupdate')
    expect(typeof wrapper.vm.textinsertupdate).toBe('string')
  })
});