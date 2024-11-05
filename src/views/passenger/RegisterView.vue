<script setup lang="ts">
import { toRefs } from 'vue'
import { type Data } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const store = useMessageStore()
const props = defineProps<{
    data: Data
    id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data } = toRefs(props)
const router = useRouter()
const register = () => {

   // router.push({ name: 'passenger-detail-view' })
    store.updateMessage('You are successuflly registered for ' + props.data.name)
     setTimeout(() => {
       store.resetMessage()
     }, 3000)
     router.push({ name: 'passenger-detail-view', params: { id: props.data._id } })

}

</script>

<template>
    <p>Register  here</p>
    <button @click="register">Register</button>
</template>
