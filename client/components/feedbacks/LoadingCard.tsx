// components/LoadingCard.tsx
export function LoadingCard({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center p-4 rounded-md bg-neutral-100)] text-secondary animate-pulse">
      <span className="font-medium">{message}</span>
    </div>
  );
};