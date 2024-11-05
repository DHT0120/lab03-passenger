<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { type Data } from '@/types'
import PassengerServices from '@/services/PassengerServices'
import { useRouter, useRoute } from 'vue-router'

const data = ref<Data | null>(null)
const router = useRouter()
const route = useRoute()
const isUpdating = ref(false)

onMounted(() => {
  fetchPassengerData()
})

const fetchPassengerData = () => {
  PassengerServices.getPassenger(route.params.id as string)
    .then((responseData) => {
      data.value = responseData;
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
      router.push({ name: 'network-error-view' })
    })
}

const handleUpdate = () => {
  isUpdating.value = true
  setTimeout(() => {
    isUpdating.value = false
    router.push({ name: 'passenger-list' })
  }, 5000)
}
</script>

<template>
  <div v-if="data">
    <h1>Edit Passenger Details</h1>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="data.name" required />
      <br />
      <label for="trips">Trips:</label>
      <input type="number" id="trips" v-model="data.trips" required />
      <br />
      <button @click.prevent="handleUpdate" v-if="!isUpdating">Update Passenger Details</button>
      <div v-if="isUpdating" class="flash-message">
        Update is in progress...
      </div>
    </form>
  </div>
</template>

<style scoped>
.flash-message {
  background-color: #ffcccc;
  color: #8b0000;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>