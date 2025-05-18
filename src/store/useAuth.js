import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

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
    },
    logout: async () => {
        try {
            await axiosInstance.get("/logout")
            set({ authUser: null });
            toast.success("Logged Out Successfully!")
        } catch (error) {
            console.log("error", error);
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post("/login", data)
            set({ authUser: response.data })
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isLoggingIn: false })
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/update/profile", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            set({ authUser: response.data })
            toast.success("Profile Updated Successfully!")
        } catch (error) {
            console.error("Profile update failed:", error);
        }finally{
            set({isUpdatingProfile: false})
        }
    }

}))
