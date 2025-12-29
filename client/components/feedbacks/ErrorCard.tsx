export function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (<div
    className="p-4 rounded-md bg-color-error text-white flex items-center justify-between gap-4">
    <span className="font-medium">{message}</span>
    {onRetry &&
      <button
        onClick={onRetry}
        className="ml-4 px-3 py-1 bg-white text-color-error rounded">Reintentar</button>}
    </div>);
}