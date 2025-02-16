// Utilities
import { InformationConnexion } from '@/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return { token: '', mail: '' };
    },
    actions: {
        updateUser(informationConnexion: InformationConnexion) {
            this.token = informationConnexion.token;
            this.mail = informationConnexion.mail;
        },
        isLogged() {
            return this.token !== undefined && this.token !== '';
        },
        deleteUser() {
            this.token = '';
            this.mail = '';
        }
    }
})
