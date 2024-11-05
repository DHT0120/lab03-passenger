<!-- src/components/EditComponent.vue -->

<script setup lang="ts">
import { toRefs, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import type { PassengerData } from '@/types';

const props = defineProps<{
  data: PassengerData;
  id: string;
}>();

const { data } = toRefs(props);
const router = useRouter();

const showUpdatedMessage = () => {
  router.push({
    name: 'passenger-detail-view',
    params: { id: props.id },
    query: { flashMessage: 'Data has been updated' }
  });
};
</script>

<template>
  <div v-if="data">
    <h1>Edit {{ data.name }}</h1>
    <p>{{ data.name }} has tripped {{ data.trips }} times</p>
    <h2>Airlines</h2>
    <ul>
      <li v-for="airline in data.airline" :key="airline._id">
        <router-link :to="{ name: 'airline-detail-view', params: { id: $route.params.id, airlineId: airline._id } }">
          {{ airline.name }}
        </router-link>
      </li>
    </ul>
    <button @click="showUpdatedMessage">Update and Show Message</button>
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
