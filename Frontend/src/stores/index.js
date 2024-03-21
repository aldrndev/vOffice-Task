import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:45000";

export const useAuthStore = create((set) => ({
  error: null,
  message: null,

  login: async (email, password, navigateCallback) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/v1/auth/login`,
        method: "POST",
        data: {
          email,
          password,
        },
      });

      set({
        message: data.message,
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("isLogin", "true");
      navigateCallback("/home");
    } catch (error) {
      set({
        error: error.response?.data.message,
      });
    }
  },
  register: async (name, email, password, phone, navigateCallback) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/v1/auth/register`,
        method: "POST",
        data: {
          name,
          email,
          password,
          phone,
        },
      });

      set({
        message: data.message,
      });
      navigateCallback("/login");
    } catch (error) {
      set({
        error: error.response?.data.message,
      });
    }
  },
  logout: (navigateCallback) => {
    localStorage.clear();
    set({
      error: null,
      message: null,
    });
    navigateCallback("/login");
  },

  resetMessage: () => {
    set({ message: null });
  },
  resetError: () => {
    set({ error: null });
  },
}));

export const useClientStore = create((set) => ({
  rooms: [],
  roomTypes: [],
  error: null,
  pagination: {},
  message: "",
  myBooking: [],

  fetchRooms: async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/v1/client/room`,
      });
      set({
        rooms: data.data,
      });
    } catch (error) {
      set({
        error: error.response?.data.message,
      });
    }
  },

  fetchRoomTypes: async (filter, search, sort, page = 1) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/v1/client/roomtype`,
        params: {
          filter: filter.join(","),
          search,
          sort,
          page,
        },
      });

      set({
        roomTypes: data.data,
        pagination: data.pagination,
      });
    } catch (error) {
      set({
        error: error.response?.data.message,
      });
    }
  },

  bookRoom: async (bookingDate, startTime, endTime, quotaUsed, id) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/v1/client/room/${id}`,
        method: "POST",
        data: {
          bookingDate,
          startTime,
          endTime,
          quotaUsed,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      set({
        message: data.message,
      });
    } catch (error) {
      set({
        error: error.response?.data.message,
      });
    }
  },

  fetchMyBooking: async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/v1/client/booking`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      set({
        myBooking: data.data,
      });
    } catch (error) {
      set({
        error: error.response?.data.message,
      });
    }
  },
  resetMessage: () => {
    set({ message: null });
  },
  resetError: () => {
    set({ error: null });
  },
}));
