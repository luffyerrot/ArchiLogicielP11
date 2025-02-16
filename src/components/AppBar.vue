<template>
    <v-app-bar>
        <template v-slot:prepend>
            <v-app-bar-nav-icon
                variant="text"
                @click.stop="drawer = !drawer"
            />
        </template>
        <template v-slot:append>
            <v-btn
                :prepend-icon="props.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                text="Changer le thème"
                slim
                @click="$emit('changeTheme')"
            />
            <p class="mx-4">{{ user.mail }}</p>
        </template>
        <v-app-bar-title
            class="clickable"
            text="Service MedHead"
            @click="goTo('/')"
        />
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        temporary
    >
        <v-list
            v-for="(item, index) in items"
            :key="'menu' + index"
        >
            <v-list-item
                :title="item.title"
                @click="goTo(item.destination)"
            />
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { useUserStore } from '@/stores/user';

    defineEmits(['changeTheme'])

    const props = defineProps<{
        theme: string
    }>()

    const user = useUserStore();

    const drawer = ref(false);
    const items = computed(() => {
        const baseItems = [
            {
                title: 'Accueil',
                destination: '/'
            },
            {
                title: 'Recherche',
                destination: '/mapfinder'
            }
        ];
        const loggedInItems = [
            {
                title: 'S\'enregistrer',
                destination: '/register'
            },
            {
            title: 'Connexion',
            destination: '/login'
            }
        ];
        const loggedOutItems = [
            {
                title: 'Se deconnecter',
                destination: '/logout'
            }
        ];
        return [...(user.isLogged() ? loggedOutItems : loggedInItems), ...baseItems]
    });

    function goTo(destination: string) {
        router.push(destination);
    }
</script>

<style scoped lang="scss">
    .clickable {
        cursor: pointer;
    }
</style>