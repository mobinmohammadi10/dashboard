import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    jwtToken: undefined,
    sessionExpiryTime: null
  }),
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    isAdmin: (state) => state.isAdmin,
    jwtToken: (state) => state.jwtToken,
    isSessionExpired: (state) => {
      if (!state.sessionExpiryTime) return true
      return new Date() > new Date(state.sessionExpiryTime)
    }
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
      this.jwtToken = undefined
      this.sessionExpiryTime = null
    },
    setJwtToken(token) {
      this.jwtToken = token
      this.isLoggedIn = true
      const expirationTime = new Date().getTime() + 60 * 60 * 1000
      this.sessionExpiryTime = new Date(expirationTime).toISOString()
    }
  }
})
