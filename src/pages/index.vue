<template>
    <h1 class="message ma-4">Bienvenue sur le service de recherche MedHead</h1>
    <div v-if="msgError !== null">
        <p class="message ma-4" style="color: red">
            {{ msgError }}
        </p>
    </div>
    <v-container>
        <v-row>
            <v-col :cols="msgSpecialite !== null ? 6 : 12">
                <v-card class="mx-auto px-6 py-8 mt-4" max-width="800">
                    <h2 class="message ma-4">Choisir ma catégorie :</h2>
                    <v-list v-for="(item, index) in msgGroupeSpecialite" :key="'groupe' + index">
                        <v-list-item :title="item.nom" style="text-align: center" @click="findSpecialites(item.id)" />
                    </v-list>
                </v-card>
            </v-col>
            <v-col v-if="msgSpecialite !== null" cols="6">
                <v-card class="mx-auto px-6 py-8 mt-4" max-width="800">
                    <h2 class="message ma-4">Choisir ma spécialité :</h2>
                    <v-list v-for="(item, index) in msgSpecialite" :key="'specialite' + index">
                        <v-list-item :title="item.nom" style="text-align: center" @click="findHopitaux(item.id)" />
                    </v-list>
                </v-card>
            </v-col>
            <v-col v-if="msgHopital !== null" cols="12">
                <v-card class="mx-auto px-6 py-8 mt-4" max-width="800">
                    <h2 class="message ma-4">Choisir mon hopital :</h2>
                    <v-list v-for="(item, index) in msgHopital" :key="'hopital' + index">
                        <v-list-item :title="item.name + ' - ' + item.available_beds + ' lit⸱s restant⸱s'"
                            :subtitle="item.adresse + ' : ' + item.latitude + ' - ' + item.longitude"
                            style="text-align: center" @click="toMapFinder(item.latitude, item.longitude)" />
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { getAllGroupe, getHopitauxBySpecialiteId, getSpecialitesByGroupeId } from "@/services/SpecialiteService";
import { GroupeSpecialiteDto, HopitalDto, SpecialiteDto } from "@/types";

const msgGroupeSpecialite: Ref<GroupeSpecialiteDto[]> = ref([]);
const msgSpecialite: Ref<SpecialiteDto[] | null> = ref(null);
const msgHopital: Ref<HopitalDto[] | null> = ref(null);
const msgError: Ref<string | null> = ref(null);
const router = useRouter();

const findSpecialites = (groupId: number) => {
    getSpecialitesByGroupeId(groupId)
        .then(response => {
            msgError.value = null;
            msgSpecialite.value = response.data;
        })
        .catch(() => msgError.value = 'Erreur lors de la récupération des spécialités du groupe ' + groupId)
};

const findHopitaux = (specialiteId: number) => {
    getHopitauxBySpecialiteId(specialiteId)
        .then(response => {
            msgError.value = null;
            msgHopital.value = response.data;
        })
        .catch(() => msgError.value = 'Erreur lors de la récupération des hopitaux de la specialite ' + specialiteId)
};

const toMapFinder = (latitude: number, longitude: number) => {
    router.push({ name: '/MapFinder', query: { latitude, longitude } })
};

onMounted(() => {
    getAllGroupe()
        .then(response => {
            msgError.value = null;
            msgGroupeSpecialite.value = response.data;
        })
        .catch(() => msgError.value = 'Erreur lors de la récupération des groupes de spécialités');
});
</script>

<style scoped lang="scss">
.message {
    text-align: center;
}
</style>