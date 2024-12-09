<template>
  <div class="flex items-center justify-center min-h-screen">
    <form @submit.prevent="handleSubmit" class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-center text-lg font-bold mb-4">Forget Password</h3>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input 
          type="email" 
          class="max-w-md w-full p-3 bg-white rounded-lg shadow-md" 
          v-model="email" 
          placeholder="Email" 
          required 
        />
      </div>
      <button 
        type="submit"
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
  name: 'Forgot',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        //const response = await axios.post('forget', {
          //email: this.email
        //});
        //console.log(response);
        
        // Navigate to the reset password page after successful submission
        this.$router.push('/resetpassword');
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  },
}
</script>

<style scoped>
/* Optional: Additional styling can be added here */
</style>
