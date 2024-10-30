import { defineStore } from 'pinia'

export const themeStore = defineStore('theme', {
  state: () => ({
    isSideBarOpen: false
  }),
  getters: {
    sidebarOpen: (state) => state.isSideBarOpen
  },
  actions: {
    toggleSideBar() {
      this.isSideBarOpen = !this.isSideBarOpen
    },
    setSidebarValue(value) {
      this.isSideBarOpen = value
    }
  }
})
