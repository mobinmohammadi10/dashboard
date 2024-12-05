import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    _isLoggedIn: false,
    _isAdmin: false,
    _jwtToken: undefined,
    _sessionExpiryTime: null
  }),
  getters: {
    isLoggedIn: (state) => state._isLoggedIn,
    isAdmin: (state) => state._isAdmin,
    jwtToken: (state) => state._jwtToken,
    isSessionExpired: (state) => {
      if (!state._sessionExpiryTime) return true
      return new Date() > new Date(state._sessionExpiryTime)
    }
  },
  actions: {
    login() {
      this._isLoggedIn = true
    },
    setAdmin() {
      this._isAdmin = true
    },
    logout() {
      this._isLoggedIn = false
      this._isAdmin = false
      this._jwtToken = undefined
      this._sessionExpiryTime = null
    },
    setJwtToken(token) {
      this._jwtToken = token
      this._isLoggedIn = true
      const expirationTime = new Date().getTime() + 60 * 60 * 1000
      this._sessionExpiryTime = new Date(expirationTime).toISOString()
    }
  }
})
