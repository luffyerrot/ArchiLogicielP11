import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import Register from "../Register.vue";

describe('Page d\'enregistrement', () => {
    const wrapper = factory(Register, true);
    renderCorrectly(wrapper);
})