<!-- src/views/PassengerDetailView.vue -->

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PassengerServices from '@/services/PassengerServices';
import type { PassengerData } from '@/types';
import FlashMessage from '@/components/FlashMessage.vue';

const route = useRoute();
const passenger = ref<PassengerData | null>(null);
const showFlashMessage = ref(false);
const flashMessage = ref('');

onMounted(async () => {
  try {
    const response = await PassengerServices.getPassenger(route.params.id as string);
    passenger.value = response;
  } catch (error) {
    console.error('Passenger not found', error);
  }

  // Check if there is a flash message in the route query
  if (route.query.flashMessage) {
    showFlashMessage.value = true;
    flashMessage.value = route.query.flashMessage as string;
  }
});

// Watch for changes in the route query to handle flash messages
watch(() => route.query.flashMessage, (newFlashMessage) => {
  if (newFlashMessage) {
    showFlashMessage.value = true;
    flashMessage.value = newFlashMessage as string;
  }
});

const closeFlashMessage = () => {
  showFlashMessage.value = false;
};
</script>

<template>
  <div v-if="passenger">
    <h1>{{ passenger.name }}</h1>
    <p>{{ passenger.name }} has tripped {{ passenger.trips }} times</p>
    <h2>Airlines</h2>
    <ul>
      <li v-for="airline in passenger.airline" :key="airline._id">
        <router-link :to="{ name: 'airline-detail-view', params: { id: route.params.id, airlineId: airline._id } }">
          {{ airline.name }}
        </router-link>
      </li>
    </ul>
    <FlashMessage v-if="showFlashMessage" :message="flashMessage" @close="closeFlashMessage" />
  </div>
  <div v-else>
    <p>Passenger not found.</p>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
