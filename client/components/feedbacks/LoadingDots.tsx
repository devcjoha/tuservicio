export function LoadingDots() {
  return (
    <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
      <span className='sr-only'>Cargando...</span>
      <div className='h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-5 w-5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-5 w-5 bg-soft rounded-full animate-bounce'></div>
    </div>
  )
}