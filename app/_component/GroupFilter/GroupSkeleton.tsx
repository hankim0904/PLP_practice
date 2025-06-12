export default function GroupSkeleton() {
  return (
    <div className="h-[90px] border-gray-100 py-[7px]">
      <div className="flex h-full w-full gap-8 pr-16">
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <div key={`group_skeleton_${i}`}>
              <div className="rounded-full h-[48px] w-[48px] bg-gray-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
