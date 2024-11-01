<template>
  <v-card>
    <v-btn @click="test">
      TEST
    </v-btn>
    <br>
    <br>
    <div v-if="msgError !== null">
      <p>{{ msgError }}</p>
    </div>
    <div v-else>
      <v-list lines="two">
        <v-list-item
          v-for="(item, index) in msgTest"
          :key="index"
          :title="item.groupe"
          :subtitle="item.nom"
          style="text-align: center"
        />
      </v-list>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { SpecialiteDto } from "@/types";
import axios from "axios";

  const msgTest: Ref<SpecialiteDto[]> = ref([]);
  const msgError: Ref<string | null> = ref(null);

  const test = () => {
    axios.get<SpecialiteDto[]>('http://localhost:8080/api/specialite')
      .then(response => {
        msgError.value = null;
        msgTest.value = response.data;
      })
      .catch(() => msgError.value = 'Erreur appel');
  };
</script>
