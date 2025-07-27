import { defineStore } from 'pinia'
import axios from '@/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isAuthenticated: false
  }),

  getters: {
    authStatus: state => state.isAuthenticated
  },

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    setAuthStatus(status) {
      this.isAuthenticated = status
    },

    // jeszcze nieużywana
    async checkUserAuthenticationStatus() {
      try {
        const response = await axios.get('/api/authenticated')
        this.setAuthStatus(response.data.status)
      } catch (err) {
        this.setAuthStatus(false)
        this.token = ''
      }
    },

    logout() {
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
