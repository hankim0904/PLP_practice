export default function CardListSkeleton() {
  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-x-3 gap-y-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={`skeleton-${i}`}>
            <div className="aspect-183/278 bg-gray-100 rounded-sm animate-pulse"></div>
          </li>
        ))}
      </ul>
    </>
  );
}
