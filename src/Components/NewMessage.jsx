import { useState } from 'react'
import { useNewMessage } from '../Hooks/useNewMessage'

export default function NewMessage({ closeMessage }) {

    const { newMessage, isLoading, error } = useNewMessage()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTitle("")
        setContent("")

        const messageSent = await newMessage(title, content)
        if (messageSent) closeMessage()
    }

    return (
        <div onClick={closeMessage} className="flex justify-center bg-opacity-90 items-center fixed bg-black top-0 left-0 w-full max-h-screen h-full">
            <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-5 gap-5 animate-popup'>
                <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>New Message</h2>
                <form className='auth-form relative' method="POST" onSubmit={handleSubmit} autoComplete='off'>
                    <input className='text-input w-64' type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title of Message'/>
                    <textarea className='w-64 sm:w-96 h-20 resize-none p-2 rounded-md border-4 border-black font-mono outline-none' name="content"  onChange={(e) => setContent(e.target.value)} placeholder='Content goes here...' value={content}/>
                    <button className="auth-button" type="submit" disabled={isLoading}>Post</button>
                    {error && <div className="error max-w-[24rem]">{error}</div>}
                    <button onClick={closeMessage} className='absolute -top-4 -right-4 w-7 h-7 p-1 text-white border-2 border-black bg-red-800 rounded-xl'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill='currentColor'/></svg></button>
                </form>
            </div>
        </div>
  )
}
