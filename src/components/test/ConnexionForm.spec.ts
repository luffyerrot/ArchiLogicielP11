import { factory, renderCorrectly } from "@/utils/test";
import { describe } from "vitest";
import ConnexionForm from "../ConnexionForm.vue";

describe('Formulaire de connexion / enregistrement', () => {
    const wrapper = factory(ConnexionForm, true, true);
    renderCorrectly(wrapper);
})