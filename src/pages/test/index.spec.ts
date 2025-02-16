import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import Index from "../index.vue";

describe('Page home', () => {
    const wrapper = factory(Index, true);
    renderCorrectly(wrapper);
})