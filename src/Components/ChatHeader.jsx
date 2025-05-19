import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuth";
import { useChatStore } from "../store/useChatStore";


const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    console.log("selected User", selectedUser);

    return (
        <div className="p-2.5 border-b border-base-300 w-full ">
            <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium capitalize ">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${onlineUsers.includes(selectedUser._id) ? 'bg-green-500' : 'bg-red-400'
                                    }`}
                            ></span>
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;