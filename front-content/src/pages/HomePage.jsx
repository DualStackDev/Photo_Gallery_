import TitleBar from "../components/titleBar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Title Bar (1/4 of the screen) */}
      <TitleBar />

      {/* Grid System (3/4 of the screen) */}
      <div className="grid grid-cols-4 grid-rows-5 gap-5 p-14 h-3/4">
        <div className="row-span-4 col-start-1 row-start-2 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="row-span-2 col-start-2 row-start-1 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="row-span-3 col-start-3 row-start-1 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-2 row-span-2 col-start-2 row-start-4 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 5"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="row-span-2 col-start-4 row-start-1 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 6"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="row-span-2 col-start-4 row-start-3 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 7"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-start-4 row-start-5 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 10"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-start-1 row-start-1 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 12"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-start-2 row-start-3 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 15"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
