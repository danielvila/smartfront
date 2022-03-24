describe('Validar Cambios', () => {
    const btn = wrapper.find('button')
    btn.trigger('click')

    test('should change name', async () => {
        expect(nameTag.text()).not.toContain('name')
        await wrapper.vm.$nextTick()
            .then( () => { 
                expect(nameTag.text()).not.toBe(lastNameValue)
             })
    })

    test('should change name', async () => {
        expect(imgTag.attributes().src).not.toBe('')
        await wrapper.vm.$nextTick()
            .then( () => { 
                expect(imgTag.attributes().src).not.toBe(lastImgValue)
             })
    })

    test('should change name', async () => {
        expect(typeTag.attributes().src).not.toBe('')
        await wrapper.vm.$nextTick()
            .then( () => { 
                expect(typeTag.attributes().src).not.toBe(lastTypeValue)
             })
    })

    test('should change name', async () => {
        expect(weightTag.attributes().src).not.toBe(0)
        await wrapper.vm.$nextTick()
            .then( () => { 
                expect(weightTag.attributes().src).not.toBe(lastWeightValue)
             })
    })

    test('should change name', async () => {
        expect(heightTag.attributes().src).not.toBe(0)
        await wrapper.vm.$nextTick()
            .then( () => { 
                expect(heightTag.attributes().src).not.toBe(lastHeightValue)
             })
    })

    test('should change name', async () => {
        expect(abilitiesTag.attributes().src).not.toBe([])
        await wrapper.vm.$nextTick()
            .then( () => { 
                expect(abilitiesTag.attributes().src).not.toBe(lastAbilitiesValue)
             })
    })
})
