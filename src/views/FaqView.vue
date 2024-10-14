<template>
  <div class="faq-page container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h1>
    
    <div class="faq-section space-y-8">

      <!-- General Questions Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">General Questions</h2>
        
        <div>
          <button @click="toggleQuestion('general1')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            What is this app for?
          </button>
          <div v-if="openQuestion === 'general1'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>This app helps organize hospital staff shifts by managing schedules for doctors, nurses, and other personnel based on availability.</p>
          </div>
        </div>

        <div>
          <button @click="toggleQuestion('general2')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            Who can use this app?
          </button>
          <div v-if="openQuestion === 'general2'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>This app is designed for hospital administrators, general physicians, nurses, and any staff involved in scheduling and managing shifts.</p>
          </div>
        </div>
      </div>

      <!-- User Management Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">User Management</h2>

        <div>
          <button @click="toggleQuestion('user1')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            How do I log in to the app?
          </button>
          <div v-if="openQuestion === 'user1'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>Use the login page with your hospital-assigned credentials.</p>
          </div>
        </div>
      </div>

      <!-- Shift Management Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Shift Management</h2>

        <div>
          <button @click="toggleQuestion('shift1')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            How do I check my assigned shifts?
          </button>
          <div v-if="openQuestion === 'shift1'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>Navigate to the Dashboard to view your weekly or monthly shift assignments.</p>
          </div>
        </div>

        <div>
          <button @click="toggleQuestion('shift2')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            How can I update my availability for shifts?
          </button>
          <div v-if="openQuestion === 'shift2'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>Go to the Calendar section, select the dates, and input your availability. The system will update accordingly.</p>
          </div>
        </div>
      </div>

      <!-- Scheduling Process Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Scheduling Process</h2>

        <div>
          <button @click="toggleQuestion('schedule1')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            How are shifts assigned?
          </button>
          <div v-if="openQuestion === 'schedule1'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>Shifts are assigned based on availability provided by users and hospital needs. The system organizes the best possible timing to avoid conflicts with the approval of the administrators.</p>
          </div>
        </div>
      </div>

      <!-- Settings and Customization Section -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Settings and Customization</h2>

        <div>
          <button @click="toggleQuestion('settings1')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            How can I change my profile information?
          </button>
          <div v-if="openQuestion === 'settings1'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>Navigate to the Settings page to update your personal details such as password.</p>
          </div>
        </div>

        <div>
          <button @click="toggleQuestion('settings2')" class="faq-question w-full text-left bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md transition">
            Can I customize notification settings for new shifts?
          </button>
          <div v-if="openQuestion === 'settings2'" class="faq-answer bg-gray-50 p-6 mt-2 border-l-4 border-blue-500 rounded-md">
            <p>Yes, you can configure notifications under the Settings page to receive alerts via email or in-app notifications when a new shift is assigned.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqPage',
  data() {
    return {
      openQuestion: null, // Tracks which question is currently open
    };
  },
  methods: {
    toggleQuestion(questionId) {
      this.openQuestion = this.openQuestion === questionId ? null : questionId;
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS will handle most of the styling, so scoped CSS is not required */
</style>
