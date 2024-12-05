vue
<template>
  <div class="flex items-center justify-center min-h-screen">
    <form @submit.prevent="handleSubmit" class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4 text-center">Reset Password</h3>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          class="max-w-md w-full p-3 bg-white rounded-lg shadow-md"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Password Confirm</label>
        <input
          type="password"
          class="max-w-md w-full p-3 bg-white rounded-lg shadow-md"
          v-model="password_confirm"
          placeholder="Password Confirm"
          required
        />
      </div>
      <button
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Reset',
  data() {
    return {
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('reset', {
          password: this.password,
          password_confirm: this.password_confirm,
          token: this.$router.params.token
        })
        console.log(response)
        this.$router.push('/login')
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  }
}
</script>

<style scoped>
/* Optional: Additional styling can be added here */
</style>