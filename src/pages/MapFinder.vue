<template>
    <v-card class="mx-auto px-6 py-8 mt-4" max-width="800">
        <GoogleMap
            :api-key="apiKey"
            style="width: 100%; height: 500px"
            :center="mapCenter"
            :zoom="10"
        >  
            <Polyline :options="drivingPath" />
        </GoogleMap>
        <v-btn @click="findPath">Chercher</v-btn>
    </v-card>
    <div v-if="msgFindError !== null">
        <p
            class="message ma-4"
            style="color: red"
        >
            {{ msgFindError }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { getPath } from '@/services/SpecialiteService';
    import { PointDto } from '@/types';
    import { GoogleMap, Polyline } from 'vue3-google-map'
    
    const msgFindError: Ref<string | null> = ref(null);
    const mapCenter = { lat: 47.36888117749755, lng: -0.49352569804404806 };
    const apiKey = 'AIzaSyB86d0Y3Drd6HxhN2aYDI-hnkLf6rw1WmE';
    const origin: PointDto = { latitude: 47.35866413146318, longitude: -0.5505390654434574 }
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
                    drivingCoordinates.value = [ leg.start_location, ...leg.steps.map(step => step.end_location) ];
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