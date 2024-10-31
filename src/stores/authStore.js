import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    jwtToken: undefined
  }),
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    isAdmin: (state) => state.isAdmin,
    jwtToken: (state) => state.jwtToken
  },
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
    },
    setJwtToken(token) {
      this.jwtToken = token
    }
  }
})
