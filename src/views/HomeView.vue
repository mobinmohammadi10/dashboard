<template>
  <div class="p-6">
    <!-- Title -->
    <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>

    <!-- List of People Who Need to Give Shifts -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">People Assigned to Shifts</h2>
      <ul class="bg-gray-100 p-4 rounded-lg shadow-md">
        <!-- Loop through the people from backend -->
        <li v-for="person in people" :key="person.id" class="border-b py-2">
          <span class="font-medium">{{ person.id }} - </span>
          {{ person.fullName }}
        </li>
      </ul>
    </div>

    <!-- Schedule Grid -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Weekly Schedule</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse table-auto">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 border">Person</th>
              <th class="p-2 border" v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td class="p-2 border font-semibold">{{ person.fullName }}</td>
              <!-- Loop through shifts for each person -->
              <td
                class="p-2 border"
                v-for="(shift, index) in person.shifts"
                :key="index"
              >
                {{ shift }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // List of days in the week (will remain static)
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

      // People data will come from the backend, initially empty
      people: []
    };
  },
  mounted() {
    // Assume backend call to fetch the list of people and their shifts
    // this.people = fetchedDataFromBackend;
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
