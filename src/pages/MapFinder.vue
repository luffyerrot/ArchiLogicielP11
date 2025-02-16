<template>
    <v-card class="mx-auto px-6 py-8 mt-4" max-width="800">
        <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="mapCenter" :zoom="10">
            <Polyline :options="drivingPath" />
        </GoogleMap>
        <v-btn @click="findPath">Chercher</v-btn>
    </v-card>
    <div v-if="msgFindError !== null">
        <p class="message ma-4" style="color: red">
            {{ msgFindError }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { getPath } from '@/services/SpecialiteService';
import { PointDto } from '@/types';
import { GoogleMap, Polyline } from 'vue3-google-map'

const msgFindError: Ref<string | null> = ref(null);
const mapCenter = { lat: 51.5049471134457, lng: -0.12220663332819873 };
const apiKey = import.meta.env.GOOGLE_MAP_API_KEY;
const origin: PointDto = { latitude: 51.502587948674886, longitude: -0.1412188474474401 }
const route = useRoute();
const targetLatitude: Ref<number | undefined> = ref(+(route.query.latitude as string));
const targetLongitude: Ref<number | undefined> = ref(+(route.query.longitude as string));

const drivingCoordinates: Ref<any[]> = ref([]);

const drivingPath = computed(() => {
    return {
        path: drivingCoordinates.value,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    }
});

const findPath = () => {
    if (targetLatitude.value && targetLongitude.value) {
        getPath({ origin, target: { latitude: targetLatitude.value, longitude: targetLongitude.value } as any as PointDto })
            .then(response => {
                msgFindError.value = null;
                const leg = response.data.routes[0].legs[0];
                drivingCoordinates.value = [leg.start_location, ...leg.steps.map(step => step.end_location)];
            })
            .catch(() => msgFindError.value = 'Erreur lors de la récupération des infos sur le chemin');
    } else {
        msgFindError.value = 'Impossible d\'effectuer la recherche';
    }
}
</script>

<style scoped lang="scss">
.message {
    text-align: center;
}
</style>