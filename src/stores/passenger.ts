import type { PassengerData } from '@/types'
import { defineStore } from 'pinia'

export const usePassengerStore = defineStore('passenger', {
  state: (): { passenger: PassengerData | null } => ({
    passenger: null
  }),
  actions: {
    setPassenger(passenger: PassengerData): void {
      this.passenger = passenger
    }
  }
})
