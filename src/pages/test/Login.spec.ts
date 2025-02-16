import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import Login from "../Login.vue";

describe('Page de connexion', () => {
    const wrapper = factory(Login, true);
    renderCorrectly(wrapper);
})