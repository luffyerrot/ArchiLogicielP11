import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import AppBar from "../AppBar.vue";

describe('Barre du header', () => {    
    const wrapper = factory(AppBar, true, true);
    renderCorrectly(wrapper);
})