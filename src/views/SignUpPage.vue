<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
        ></div>
        <div class="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Sign Up</h1>
            </div>
            <div class="flex items-center justify-between divide-y">
              <h4 class="text-red-600 text-bold">{{ signupMessage }}</h4>
            </div>
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <form @submit.prevent="handleSignup">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                  <div v-for="(label, key) in fields" :key="key" class="relative">
                    <input
                      :type="key === 'password' || key === 'confirmPassword' ? 'password' : 'text'"
                      v-model="form[key]"
                      :name="key"
                      :placeholder="label"
                      required
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:borer-rose-600"
                    />
                    <label
                      :for="key"
                      class="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-400 peer-focus:text-sm"
                      >{{ label }}</label
                    >
                  </div>

                  <div class="relative mt-4">
                    <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Role</label>
                    <select
                      v-model="form.role"
                      name="role"
                      required
                      class="h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <p v-if="passwordMismatch" class="text-sm text-red-500">Passwords do not match.</p>
                  <button
                    type="submit"
                    :disabled="passwordMismatch"
                    class="w-full py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
  
              <div class="w-full flex justify-center mt-4">
                <router-link
                  to="/login"
                  class="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Log In
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'  // Default role selection
  })
  const signupMessage = ref('')
  
  const fields = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password'
  }
  
  const passwordMismatch = computed(() => form.value.password !== form.value.confirmPassword)
  
  const handleSignup = async () => {
    if (passwordMismatch.value) {
      signupMessage.value = 'Passwords do not match.'
      return
    }
    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      })
      const data = await res.json()
      if (res.ok) {
        console.log('User signed up successfully')
        router.push('/login')
      } else {
        signupMessage.value = data.message
      }
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }
  
  // Enable dark mode if the setting is on
  onMounted(() => {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'True'
    if (darkModeEnabled) {
      document.documentElement.classList.add('dark')
    }
  })
  </script>
  