export function LoadingDots() {
  return (
    <div className='flex space-x-2 justify-center items-center bg-background h-screen'>
      <span className='sr-only'>Cargando...</span>
      <div className='h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-3 w-3 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-3 w-3 bg-soft rounded-full animate-bounce'></div>
    </div>
  )
}