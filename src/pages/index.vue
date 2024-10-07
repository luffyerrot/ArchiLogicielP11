<template>
  <v-btn @click="test">
    TEST
  </v-btn>
  <p>
    {{ msgTest }}
  </p>
</template>

<script setup lang="ts">
  import axios from "axios";

  const msgTest = ref<string | null>(null);

  const test = () => {
    console.log('TEST !');
    axios.get('http://localhost:8080/test/', { headers: {} })
      .then(response => msgTest.value = response.data)
      .catch(() => msgTest.value = 'Erreur appel');
  };

</script>
