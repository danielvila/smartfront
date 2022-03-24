import {mount} from '@vue/test-utils';
import App from '@/App';

const wrapper = mount(App);

describe('Testing the correct rendering of elements', ()=>{
    test('should render 2 sections',()=>{
        //comprueba que exista la clase y luego comprueba si el elemento es un section
        expect(wrapper.find('.shadow').exists()).toBeTruthy();
        expect(wrapper.find('.shadow').element.tagName.toLowerCase() == 'div').toBeTruthy();
     });
    test('should render 1 button', () => {
        expect(wrapper.find('button').exists()).toBeTruthy();
        expect(wrapper.find('button').element.tagName.toLowerCase() == 'button').toBeTruthy();
    });
    /*test('should render 1 ul', () => {
        expect(wrapper.find('ul').exists()).toBeTruthy();
        expect(wrapper.find('ul').element.tagName.toLowerCase() == 'ul').toBeTruthy();
    });*/
   
   // console.log(wrapper.html())
})