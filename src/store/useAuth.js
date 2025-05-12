import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/readuser")
            set({ authUser: response.data })
        } catch (error) {
            console.log("Error in Check Auth", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const response = await axiosInstance.post("/signup", data);
            set({ authUser: response.data })
            toast.success("Account Created Successfully!");
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    }

}))
