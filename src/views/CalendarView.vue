<template>
  <div class="container mx-auto p-4">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-center mb-4">Enter your suggestions and limitations for your shifts</h1>

    <!-- Calendar Header -->
    <div class="flex justify-between items-center mb-4">
      <button @click="prevMonth" class="p-2 bg-gray-200 rounded hover:bg-gray-300">
        &lt;
      </button>
      <div class="text-xl font-bold">
        {{ months[month] }} {{ year }}
      </div>
      <button @click="nextMonth" class="p-2 bg-gray-200 rounded hover:bg-gray-300">
        &gt;
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-4">
      <!-- Days of the Week -->
      <div v-for="(day, index) in daysOfWeek" :key="index" class="text-center font-semibold">
        {{ day }}
      </div>

      <!-- Placeholder for previous month's days -->
      <div v-for="empty in leadingEmptyDays" :key="'empty-' + empty" class="p-4"></div>

      <!-- Days of the month -->
      <div
        v-for="date in daysInMonth"
        :key="date"
        class="p-4 border rounded-lg flex flex-col items-center justify-between"
        :class="isToday(date) ? 'bg-blue-100' : 'bg-white'"
      >
        <div class="text-lg font-bold">{{ date }}</div>
        
        <!-- Suggestion and Limitation Buttons -->
        <div class="flex mt-2 space-x-2">
          <!-- Green Button for Suggestion -->
          <button
            @click="setOption(date, 'suggestion')"
            :class="['p-2 rounded-full', isSuggestion(date) ? 'bg-green-500 text-white' : 'bg-green-200']"
            title="Suggestion"
          >
            S
          </button>

          <!-- Red Button for Limitation -->
          <button
            @click="setOption(date, 'limitation')"
            :class="['p-2 rounded-full', isLimitation(date) ? 'bg-red-500 text-white' : 'bg-red-200']"
            title="Limitation"
          >
            L
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectedOptions: new Map(), // Using Map for reactivity
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
    };
  },
  computed: {
    daysInMonth() {
      const days = new Date(this.year, this.month + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    leadingEmptyDays() {
      const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
      return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    }
  },
  methods: {
    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
    },
    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
    },
    // Set the selected option for a given date
    setOption(date, option) {
      const dateStr = `${this.year}-${this.month + 1}-${date}`; // Adjust the month number to be 1-based
      console.log(`Clicked on: ${dateStr} | Option: ${option}`);

      // Check if date already has a selected option
      if (this.selectedOptions.has(dateStr)) {
        const currentOption = this.selectedOptions.get(dateStr);
        
        // If the same option is clicked, remove it (toggle)
        if (currentOption === option) {
          this.selectedOptions.delete(dateStr);
          console.log(`Deselected ${option} for ${dateStr}`);
        } else {
          // Otherwise, update the option
          this.selectedOptions.set(dateStr, option);
          console.log(`Updated ${option} for ${dateStr}`);
        }
      } else {
        // If no option is set, select it
        this.selectedOptions.set(dateStr, option);
        console.log(`Selected ${option} for ${dateStr}`);
      }
    },
    // Check if the current option is "suggestion"
    isSuggestion(date) {
      const dateStr = `${this.year}-${this.month + 1}-${date}`; // Adjust the month number to be 1-based
      return this.selectedOptions.get(dateStr) === 'suggestion';
    },
    // Check if the current option is "limitation"
    isLimitation(date) {
      const dateStr = `${this.year}-${this.month + 1}-${date}`; // Adjust the month number to be 1-based
      return this.selectedOptions.get(dateStr) === 'limitation';
    },
    isToday(date) {
      const today = new Date();
      return (
        today.getDate() === date &&
        today.getMonth() === this.month &&
        today.getFullYear() === this.year
      );
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.grid {
  grid-template-columns: repeat(7, 1fr);
}

button {
  min-width: 36px;
  min-height: 36px;
  transition: background-color 0.2s ease;
}
</style>
