import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuth";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/sideusers")
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get("/getmessages/" + userId)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },
    createMessage: async (messageData) => {

        const { messages, selectedUser } = get()
        try {
            const newMessage = await axiosInstance.post("/create/message/" + selectedUser._id, messageData);
            set({ messages: [...messages, newMessage.data.newMessage] })

        } catch (error) {
            toast.error(error.response.data.message)
        }

    },
    subscribeTomessages: async () => {
        const { selectedUser } = get()
        if (!selectedUser) return
        const socket = useAuthStore.getState().socket
        if (socket) {
            socket.on("newMessage", (message) => {
                const isMessageFromSelectedUser = message.senderId === selectedUser._id

                if (!isMessageFromSelectedUser) return

                console.log("message", message);
                set({ messages: [...get().messages, message] })
                console.log("socket message", message);

            })
        }
    },
    unsubscribeTomessages: async () => {
        const { socket } = useAuthStore.getState()
        socket.off("newMessage")
    },

    setSelectedUser: async (selectedUser) => { set({ selectedUser }) }
}))
