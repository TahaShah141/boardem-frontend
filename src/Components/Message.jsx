import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from 'react'
import { useAPI } from '../Hooks/useAPI'

export const Message = ({ message, editable=false }) => {

    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const [title, setTitle] = useState(message.title)
    const [content, setContent] = useState(message.content)

    const { deleteMessage, isLoading: deleteLoading, error: deleteError } = useAPI()
    const { editMessage, isLoading: editLoading, error: editError } = useAPI()

    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => setLoading(deleteLoading || editLoading), [deleteLoading, editLoading])
    useEffect(() => {
        let error = null
        if (editing) error = editError
        if (deleting) error = deleteError
        setError(error)
    }, [deleteError, editError])

    const resetStates = () => {
        setError(null)
        setEditing(false)
        setDeleting(false)
    }

    const cancelAction = () => {
        if (deleting) setDeleting(false)
        if (editing) setEditing(false)
    }

    const confirmAction = () => {
        if (deleting) {
            deleteMessage(message._id)
        }

        if (editing) {
            if (!(title === message.title && content === message.content))
                editMessage(message._id, {title, content})
        }

        resetStates()
    }

    const options = (
        <div className={`${editable? "group-hover:flex": ""} hidden gap-1 x-sm:gap-2 sm:gap-3`}>
            <button className='w-7 h-7 p-1 x-sm:w-9 x-sm:h-9 sm:h-11 sm:w-11 sm:p-2 rounded-full bg-black bg-opacity-10 hover:bg-opacity-25 hover:scale-110 focus:bg-opacity-25 focus:scale-110' onClick={(e) => {e.stopPropagation(); setTimeout(() => setEditing(true), 300)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" fill='currentColor'/></svg></button>
            <button className='w-7 h-7 p-1 x-sm:w-9 x-sm:h-9 sm:h-11 sm:w-11 sm:p-2 rounded-full bg-black bg-opacity-10 hover:bg-opacity-25 hover:scale-110 focus:bg-opacity-25 focus:scale-110' onClick={(e) => {e.stopPropagation(); setTimeout(() => setDeleting(true), 300)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" fill='currentColor'/></svg></button>
        </div>
    )

    const confirmation = (
        <div className={`${editable? "group-hover:flex": ""} hidden gap-1 x-sm:gap-2 sm:gap-3`}>
            <button className='w-7 h-7 p-1 x-sm:w-9 x-sm:h-9 sm:h-11 sm:w-11 sm:p-2 rounded-full bg-black bg-opacity-10 hover:bg-opacity-25 hover:scale-110 focus:bg-opacity-25 focus:scale-110 hover:bg-green-400 focus:bg-green-400' onClick={(e) => {e.stopPropagation(); confirmAction()}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" fill='currentColor'/></svg></button>
            <button className='w-7 h-7 p-1 x-sm:w-9 x-sm:h-9 sm:h-11 sm:w-11 sm:p-2 rounded-full bg-black bg-opacity-10 hover:bg-opacity-25 hover:scale-110 focus:bg-opacity-25 focus:scale-110  hover:bg-red-600 focus:bg-red-600' onClick={(e) => {e.stopPropagation(); cancelAction()}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill='currentColor'/></svg></button>
        </div>
    )

    return (
        <div className="group flex flex-col x-sm:gap-2 bg-primary p-3 x-sm:p-5 rounded-md text-white border-4 border-red-600 hover:border-red-500 w-full" onMouseLeave={resetStates}>
            <div className='flex justify-between items-center'>
                <h3 className="font-bold text-xl x-sm:text-2xl hover:border-b-2 border-white">{message.username}</h3>
                {!editing && !deleting && <p className={`${editable? "group-hover:hidden": ""} hidden text-neutral-300 italic font-mono min-[500px]:block`}>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</p>}
                {editable && 
                (!deleting && !editing && options) ||
                (!isLoading && !error && confirmation) ||
                (isLoading && <p className='text-bold font-mono p-2 text-xl animate-pulse -z-10'>Loading...</p>) ||
                (error && <div className='error' onMouseLeave={() => {setError(null); cancelAction()}}>{error}</div>)}
            </div>
            <div className="m-1 x-sm:m-2 p-2 flex flex-col gap-1 bg-neutral-600 rounded-md border-2 border-black">
                {!editing && (
                    <>
                        <h4 className="text-md x-sm:text-lg capitalize">{message.title}</h4>
                        <p className="text-xs x-sm:text-sm font-mono px-2 x-sm:px-3 md:px-5">{message.content}</p>
                    </>
                )}

                {editing && (
                    <>
                        <input className='text-input text-black w-full' type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title of Message'/>
                        <textarea className=' w-full h-24 x-sm:h-28 sm:h-32 resize-none p-2 rounded-md border-4 border-black font-mono outline-none text-black' name="content"  onChange={(e) => setContent(e.target.value)} placeholder='Content goes here...' value={content}/>
                    </>
                )}
            </div>

            <p className="text-right text-neutral-300 italic font-mono min-[500px]:hidden text-xs x-sm:text-sm">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</p>
        </div>
    )
}
