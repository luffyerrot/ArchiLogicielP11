import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import Error404 from "../Error404.vue";

describe('Page 404', () => {
    const wrapper = factory(Error404, true);
    renderCorrectly(wrapper);
})