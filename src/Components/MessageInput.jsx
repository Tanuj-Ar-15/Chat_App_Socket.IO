import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {

    const [text, setText] = useState("")
    const [imagePrev, setImagePrev] = useState(null)
    const fileInputRef = useRef()
    const { createMessage, selectedUser, getMessages } = useChatStore()
    const handleImageChange = (e) => {

        const file = e.target.files[0]
        if (!file.type.startsWith("image/")) {
            toast.error("Please Select the file with image file");
            return;
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            setImagePrev(reader.result)
        }



    }
    const removeImagePrev = () => {
        setImagePrev(null)
        if (fileInputRef.current) fileInputRef.current.value = "";

    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!text.trim() && !imagePrev) return;

        try {
            await createMessage({ text: text.trim(), image: imagePrev })
            setText("")
            setImagePrev("")
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (error) {

        }

    }


    return (
        <div className='p-4 w-full ' >
            {imagePrev && (
                <div className='mb-3 flex items-center gap-2' >
                    <div className="relative">
                        <img src={imagePrev} alt='Preview' className='w-20 h-20 object-cover rounded-lg border border-zinc-700 ' />
                        <button onClick={removeImagePrev} className='absolute -top-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' type='button'   ><X className='size-3' /></button>
                    </div>

                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-2 ' >
                <div className='flex flex-1 gap-2' >

                    <input type='text' className='w-full input input-bordered rounded-lg input-sm sm:input-md focus:outline-none focus:ring-0  ' placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />

                    <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />

                    <button type='button' className={`hidden sm:flex btn btn-circle ${imagePrev ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current.click()}   >

                        <Image size={20} />
                    </button>
                </div>
                <button type='submit' className='btn btn-sm btn-circle' disabled={!text.trim() && !imagePrev}  >
                    <Send size={20} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput