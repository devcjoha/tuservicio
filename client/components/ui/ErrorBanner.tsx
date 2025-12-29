export function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full mb-4 p-3 rounded-md bg-color-error text-white shadow-sm" >
      <span className="font-medium text-error">{message}</span>
    </div>
  );
}