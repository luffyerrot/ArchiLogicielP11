import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import AppFooter from "../AppFooter.vue";

describe('Footer', () => {
    const wrapper = factory(AppFooter, true);
    renderCorrectly(wrapper);
})