import { defineStore } from "pinia";
import api from "@/axios";
import { useStaffStore } from "@/stores/staff";
import { useGuestStore } from "@/stores/guests";
import { useEventTasksStore } from "@/stores/eventTasks";
import { useEventsStore } from "@/stores/events";
import { usePublicationsStore } from "@/stores/publications";
import { useEventMembersStore } from "@/stores/eventMembers";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
  }),

  getters: {
    authStatus: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },

  actions: {
    async login(email, password) {
      try {
        const formData = new FormData();
        formData.append("Email", email);
        formData.append("Password", password);

         const { data } = await api.post("/api/Account/login", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        await this.setToken(data.token);

        // jeżeli API zwraca dane użytkownika
        // if (data.user) {
        //   this.user = data.user;
        // }
  
        return { success: true} ;
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    async setToken(token) {
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem("token", token);
    },

    // async checkUserAuthenticationStatus() {
    //   try {
    //     const { data } = await api.get("/api/authenticated");
    //     this.isAuthenticated = data.status === true;
    //     if (!this.isAuthenticated) {
    //       this.logout();
    //     }
    //   } catch {
    //     this.logout();
    //   }
    // },

    logout() {
      this.clearAuth();

      // reset innych store’ów
      useStaffStore().$reset();
      useGuestStore().$reset();
      useEventTasksStore().$reset();
      useEventsStore().$reset();
      usePublicationsStore().$reset();
      useEventMembersStore().$reset();
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.clear();
    },
  },
});
