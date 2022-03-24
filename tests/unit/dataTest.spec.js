import {shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
const wrapper = shallowMount(App);

describe('Testing of the data() properties', ()=>{
    test('should have textinsertupdate property',()=>{
        expect(wrapper.vm.$data).toHaveProperty('textinsertupdate');
        expect(typeof wrapper.vm.textinsertupdate).toBe('string');
    });
    /*test('should have image property',()=>{
        //Se valida la propiedad image de data()
        expect(wrapper.vm.$data).toHaveProperty('image');
        //Se valida el tipo de dato de la propiedad image
        expect(typeof wrapper.vm.image).toBe('string');
    });*/
    /*test('should have weight property',()=>{
        expect(wrapper.vm.$data).toHaveProperty('weight');
        expect(typeof wrapper.vm.weight).toBe('number');
    });*/
    test('should have loading property',()=>{
        expect(wrapper.vm.$data).toHaveProperty('loading');
        //Se valida el tipo de dato de la propiedad abilities 
        //preguntando si es o no un array por medio de un booleano
        expect(Array.isArray(wrapper.vm.loading)).toBeTruthy();
    })
})