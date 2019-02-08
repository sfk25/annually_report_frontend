import Vue from 'vue'
import List from '@/components/List'

describe('List.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(List)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
