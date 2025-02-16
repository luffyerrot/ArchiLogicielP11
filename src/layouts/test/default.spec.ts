import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import Default from "../Default.vue";

describe('Page principale', () => {
    const wrapper = factory(Default, true);
    renderCorrectly(wrapper);
})