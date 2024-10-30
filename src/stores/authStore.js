import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false
  }),
  actions: {
    login() {
      this.isLoggedIn = true
    },
    setAdmin() {
      this.isAdmin = true
    },
    logout() {
      this.isLoggedIn = false
      this.isAdmin = false
    }
  }
})
