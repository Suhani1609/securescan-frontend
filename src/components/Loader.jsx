export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-full py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
}
