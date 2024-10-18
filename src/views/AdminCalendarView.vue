<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const message = ref('This is a placeholder')
const dates = ref([])

const users = ref([{ user: 'user1' }, { user: 'user2' }])
</script>

<template>
  <div class="container mx-10 mt-10 p-6 bg-white shadow-lg rounded-lg">
    <div>
      <p class="text-lg text-gray-700 font-semibold pb-5">{{ message }}</p>

      <!-- Datepicker for selecting a date -->
      <DatePicker v-model="dates" multiple min="1403-08-01" max="1403-08-30" class="w-full" />

      <div class="text-gray-700">
        <!-- Component Start -->
        <div class="flex flex-grow overflow-auto">
          <div class="flex flex-col flex-grow">
            <div class="flex items-center mt-4">
              <div class="flex ml-6">
                <button>
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <h2 class="ml-2 text-xl font-bold leading-none">September, 2020</h2>
            </div>
            <div class="grid grid-cols-7 mt-4">
              <div
                v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                :key="day"
                class="pl-1 text-sm"
              >
                {{ day }}
              </div>
            </div>
            <div
              class="grid flex-grow w-full h-auto grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-gray-200"
            >
              <div v-for="day in 30" :key="day" class="relative flex flex-col bg-white group">
                <span class="mx-2 my-1 text-xs font-bold">{{ day }} September</span>
                <div class="flex flex-col px-1 py-1 overflow-auto">
                  <draggable
                    v-model="users"
                    item-key="user"
                    group="users"
                    :sort="true"
                    @start="drag = true"
                    @end="drag = false"
                  >
                    <template #item="{ element }">
                      <button
                        class="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200"
                      >
                        <span class="flex-shrink-0 w-2 h-2 rounded-full"></span>
                        <span class="ml-2 font-light leading-none">{{ element.user }}</span>
                      </button>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Component End -->
      </div>
    </div>
  </div>
</template>
