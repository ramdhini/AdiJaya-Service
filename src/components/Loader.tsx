// components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="ml-3 text-orange-600">Searching for recipes...</span>
    </div>
  );
}
