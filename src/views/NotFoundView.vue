<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div class="bg-white p-10 shadow-lg rounded-lg text-center">
      <h1 class="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <h2 class="text-2xl text-gray-700 font-semibold mb-6">Oops! Page not found</h2>
      <p class="text-gray-500 mb-8">
        The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <router-link
        to="/"
        class="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
