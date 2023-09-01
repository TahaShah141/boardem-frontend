import { useState } from 'react'
import { useAPI } from '../Hooks/useAPI'

export default function NewMessage({onSuccess, board}) {

    const { newMessage, isLoading, error } = useAPI()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTitle("")
        setContent("")
        const messageSent = board ? await newMessage(title, content, board._id): await newMessage(title, content)
        if (messageSent) onSuccess()
    }

    return (
        <>
        <h2 className='font-semibold text-xl bg-primary py-3 px-5 text-white rounded-xl shadow shadow-red-400'>New Message</h2>
        <form className='auth-form relative' method="POST" onSubmit={handleSubmit} autoComplete='off'>
            <input className='text-input w-64' type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title of Message'/>
            <textarea className='w-64 sm:w-96 h-20 resize-none p-2 rounded-md border-4 border-black font-mono outline-none' name="content"  onChange={(e) => setContent(e.target.value)} placeholder='Content goes here...' value={content}/>
            <button className="auth-button" type="submit" disabled={isLoading}>Post</button>
            {error && <div className="error max-w-[24rem]">{error}</div>}
        </form>
        </>
  )
}
