<template>
    <h1 class="message"> {{ props.register ? 'Enregistrement' : 'Connexion' }} </h1>
    <v-card class="mx-auto px-6 py-8 mt-4" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="props.register ? onRegister() : onLogin()"
      >
        <v-text-field
          v-model="mail"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="E-mail"
          type="email"
          clearable
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Mot de passe"
          type="password"
          placeholder="Entrer le mot de passe"
          clearable
        />

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          {{ props.register ? "S'enregistrer" : "Se connecter" }}
        </v-btn>
      </v-form>
      <div v-if="msgConnexionError !== null">
        <p
          class="message mt-4"
          style="color: red"
        >
          {{ msgConnexionError }}
        </p>
      </div>
    </v-card>
</template>
  
<script setup lang="ts">
    import router from '@/router';
import { login, subscribe } from '@/services/AuthService';
    import { useUserStore } from '@/stores/user';

    const props = defineProps<{
        register: boolean
    }>()

    const user = useUserStore()

    const msgConnexionError: Ref<string | null> = ref(null);
    const form: Ref<boolean> = ref(false);
    const mail: Ref<string | null> = ref(null);
    const password: Ref<string | null> = ref(null);
    const loading: Ref<boolean> = ref(false);

    const connexionDto = computed(() => ({ mail: mail.value ? mail.value : '', motdepasse: password.value ? password.value : '' }));

    function onRegister() {
        loading.value = true;
        subscribe(connexionDto.value)
        .then(() => {
            msgConnexionError.value = null;
            router.push('/login');
        })
        .catch(() => msgConnexionError.value = 'Erreur lors de l\'inscription')
        .finally(() => loading.value = false);
    };
    
    function onLogin() {
        loading.value = true;
        login(connexionDto.value)
        .then(response => {
            user.updateUser(response.data);
            router.push('/mapfinder');
        })
        .catch(() => msgConnexionError.value = 'Erreur lors de la connexion')
        .finally(() => loading.value = false);
    };

    const required = (value: string) => {
        return !!value || 'Le champ est requis'
    };
</script>

<style scoped lang="scss">
  .message {
    text-align: center;
  }
</style>