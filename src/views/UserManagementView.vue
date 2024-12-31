<template>
  <div
    class="container mx-auto px-10 pl-20 py-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 min-h-screen"
  >
    <!-- Unique ID Generation Section -->
    <h2 class="text-2xl font-bold mb-4">Admin ID</h2>
    <button
      @click="generateUniqueId"
      :disabled="isGenerated"
      class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate Unique ID
    </button>
    <p v-if="generatedId" class="text-gray-600 dark:text-gray-300">
      Admin ID: <strong>{{ generatedId }}</strong>
    </p>

    <!-- Requested Users Table -->
    <h2 class="text-2xl font-bold mb-4">Requested Users</h2>
    <table class="w-full table-auto border-collapse mb-8">
      <thead>
        <tr
          class="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal"
        >
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-gray-300 text-sm font-light">
        <tr
          v-for="user in requestedUsers"
          :key="user.id"
          class="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <td class="py-3 px-6 text-left">{{ user.id }}</td>
          <td class="py-3 px-6 text-left">{{ user.name }}</td>
          <td class="py-3 px-6 text-center">
            <button
              @click="acceptUser(user)"
              class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
            >
              Accept
            </button>
            <button
              @click="deleteUser(user.id)"
              class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Accepted Users Table -->
    <h2 class="text-2xl font-bold mb-4">Accepted Users</h2>
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr
          class="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal"
        >
          <th class="py-3 px-6 text-left">Photo</th>
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-left">Dates</th>
          <th class="py-3 px-6 text-center"></th>
        </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-gray-300 text-sm font-light">
        <tr
          v-for="user in acceptedUsers"
          :key="user.id"
          class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <td class="py-3 px-6 text-left">
            <img
              :src="user.profilePhoto"
              alt="Profile Photo"
              class="w-10 h-10 rounded-full object-cover"
            />
          </td>
          <td class="py-3 px-6 text-left">{{ user.id }}</td>
          <td class="py-3 px-6 text-left">{{ user.name }}</td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-left">
            <span v-for="date in user.dates" :key="date" class="block">{{
              new Date(date).toLocaleDateString()
            }}</span>
          </td>
          <td class="py-3 px-6 text-center">
            <button
              @click="editCalendar(user)"
              class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Edit Calendar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Calendar Modal -->
    <div
      v-if="showCalendarView"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-3/4">
        <h2 class="text-2xl font-bold mb-4">Edit Calendar for {{ selectedUser.name }}</h2>

        <!-- Suggestions Section -->
        <h3 class="text-xl font-semibold mb-2">Suggestions</h3>
        <ul class="mb-6">
          <li
            v-for="date in suggestions"
            :key="date"
            class="flex items-center justify-between border-b py-2"
          >
            <span>{{ new Date(date).toLocaleString() }}</span>
            <div>
              <button
                @click="approveSuggestion(selectedUser.id, adminId, [date])"
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
              >
                Approve
              </button>
              <button
                @click="dismissSuggestion(selectedUser.id, adminId, [date])"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Dismiss
              </button>
            </div>
          </li>
        </ul>

        <!-- Limitations Section -->
        <h3 class="text-xl font-semibold mb-2">Limitations</h3>
        <ul class="mb-6">
          <li
            v-for="date in limitations"
            :key="date"
            class="flex items-center justify-between border-b py-2"
          >
            <span>{{ new Date(date).toLocaleString() }}</span>
            <div>
              <button
                @click="approveLimitation(selectedUser.id, adminId, [date])"
                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
              >
                Approve
              </button>
              <button
                @click="dismissLimitation(selectedUser.id, adminId, [date])"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Dismiss
              </button>
            </div>
          </li>
        </ul>

        <!-- Close Button -->
        <button @click="closeCalendar" class="bg-red-500 text-white px-4 py-2 rounded mt-4">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import router from '@/router'

const authStore = useAuthStore()
const requestedUsers = ref([])
const acceptedUsers = ref([])
const showCalendarView = ref(false)
const selectedUser = ref(null)
const suggestions = ref([])
const limitations = ref([])

const adminId = authStore.isAdmin ? authStore.userId : null

const generatedId = ref('')
const isGenerated = ref(false)

onMounted(() => {
  if (authStore.isAdmin) {
    fetchAcceptedUsers()
    fetchRequestedUsers()
  } else {
    router.push({ name: 'notFound' })
  }
})

const fetchRequestedUsers = async () => {
  try {
    const response = await axios.post('http://localhost:3000/assignment/getAdminProposals', {
      adminId: adminId
    })
    requestedUsers.value = response.data.proposals || []
  } catch (error) {
    console.error('Error fetching requested users:', error)
  }
}

const fetchAcceptedUsers = async () => {
  try {
    const response = await axios.post('http://localhost:3000/assignment/getAdminUsers', {
      adminId: adminId
    })
    acceptedUsers.value = response.data.users || []
  } catch (error) {
    console.error('Error fetching accepted users:', error)
  }
}

const acceptUser = async (user) => {
  try {
    const response = await axios.put(`http://localhost:3000/assignment`, {
      adminId: adminId,
      userId: user.id
    });

    console.log('User accepted successfully', response.data);

    requestedUsers.value = requestedUsers.value.filter((u) => u.id !== user.id)
    acceptedUsers.value.push(user);
  } catch (error) {
    console.error('Error accepting user:', error)
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/assignment/removeProposalAdmin`, {
      data: { 
        adminId: adminId,
        userId: userId
      },
    });

    console.log('User deleted successfully', response.data);

    requestedUsers.value = requestedUsers.value.filter((user) => user.id !== userId)
  } catch (error) {
    console.error('Error deleting user:', error)
  }
};

const editCalendar = async (user) => {
  selectedUser.value = user
  await fetchSuggestionsAndLimitations(user.id)
  showCalendarView.value = true
}

const fetchSuggestionsAndLimitations = async (userId) => {
  try {
    const [suggestionsRes, limitationsRes] = await Promise.all([
      axios.get(`http://localhost:3000/shift/suggestions/${userId}`),
      axios.get(`http://localhost:3000/shift/limitations/${userId}`)
    ]);
    suggestions.value = suggestionsRes.data || []
    limitations.value = limitationsRes.data || []

    console.log('Suggestions:', suggestions.value);
    console.log('Limitations:', limitations.value);

  } catch (error) {
    console.error('Error fetching suggestions/limitations:', error)
  }
}

const approveSuggestion = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/approve/suggestions`, {
      userId,
      adminId,
      suggestionDates: dates
    });

    console.log('Dates approved successfully:', dates);

    suggestions.value = suggestions.value.filter((date) => !dates.includes(date))
  } catch (error) {
    console.error('Error approving suggestions:', error)
  }
};

const approveLimitation = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/approve/limitations`, {
      userId,
      adminId,
      limitationDates: dates
    });

    console.log('Dates approved successfully:', dates);

    limitations.value = limitations.value.filter((date) => !dates.includes(date))
  } catch (error) {
    console.error('Error approving limitations:', error)
  }
};

const dismissSuggestion = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/dismisse/suggestions`, {
      userId,
      adminId,
      suggestionDates: dates
    });

    console.log('Dates dismissed successfully:', dates);

    suggestions.value = suggestions.value.filter((date) => !dates.includes(date))
  } catch (error) {
    console.error('Error dismissing suggestions:', error)
  }
};


const dismissLimitation = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/dismisse/limitations`, {
      userId,
      adminId,
      limitationDates: dates
    });

    console.log('Dates dismissed successfully:', dates);

    limitations.value = limitations.value.filter((date) => !dates.includes(date))
  } catch (error) {
    console.error('Error dismissing limitations:', error)
  }
};

const closeCalendar = () => {
  showCalendarView.value = false
  selectedUser.value = null
  suggestions.value = []
  limitations.value = []
}

const generateUniqueId = () => {
  generatedId.value = uuidv4()
  isGenerated.value = true
}
</script>

<style scoped>
.close-button {
  display: block;
  margin: 1rem auto;
}
</style>
