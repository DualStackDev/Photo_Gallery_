export default function TitleBar() {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-800 text-white h-1/4">
      <h1 className="text-3xl font-bold">Aryan</h1>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2024/10/16/16/14/cat-9125207_1280.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
