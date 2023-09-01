export function Popup({children, closeMessage}) {

  return (
    <div onClick={closeMessage} className="flex justify-center bg-opacity-90 items-center fixed bg-black top-0 left-0 w-full max-h-screen h-full">
            <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-5 gap-5 animate-popup'>
                {children}
            </div>
    </div>
  )
}
