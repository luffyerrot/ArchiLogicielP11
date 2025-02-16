import { ComponentMountingOptions, mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { expect, it } from "vitest";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export function factory(originalComponent: any, shallow = false, pinia = false, options?: ComponentMountingOptions<any, unknown>): VueWrapper<unknown, any> {
    if (pinia) {
        setActivePinia(createPinia());
    }
    if (shallow) {
        return shallowMount(originalComponent, options);
    } else {
        const vuetify = createVuetify({
            components,
            directives,
        });
        const defaultOptions = {
            global: {
                plugins: [vuetify]
            },
            ...options
        };
        return mount(originalComponent, defaultOptions);
    }
};

export function renderCorrectly(wrapper: VueWrapper<unknown, any>) {
    it('Bon affichage de la page', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
}