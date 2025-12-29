export function EmptyCard({ message }: { message: string }) {
  return (
    <div
      className="flex items-center justify-center p-4 rounded-md bg-neutral-200 text-neutral-700">
      <span
        className="font-medium">{message}
      </span>
    </div>);
}