import { factory, renderCorrectly } from "@/utils/test";
import { describe, expect, it, vi } from "vitest";
import MapFinder from "../MapFinder.vue";
import { VBtn } from "vuetify/components";
import { getPath } from "@/services/SpecialiteService";

describe('Page de connexion', () => {
    vi.mock('vue-router', () => ({
        useRoute: vi.fn(() => ({
            query: {
                latitude: 0.1,
                longitude: 0.1
            }
        }))
    }))
    const wrapper = factory(MapFinder);

    renderCorrectly(wrapper);

    it('Appel le service de recherche', async () => {
        vi.mock('@/services/SpecialiteService', {
            spy: true
        })

        const btn = wrapper.findComponent(VBtn);

        expect(btn.exists()).toBeTruthy();

        await btn.trigger('click');

        expect(getPath).toHaveBeenCalledOnce();
    })
})