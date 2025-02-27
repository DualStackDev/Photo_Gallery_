export default function Home() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Vite App</h1>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </nav>
  
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center py-20 bg-blue-500 text-white">
          <h2 className="text-4xl font-extrabold">Welcome to My Vite + React + Tailwind App</h2>
          <p className="mt-4 text-lg">Fast, lightweight, and easy to customize.</p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">Get Started</button>
        </header>
  
        {/* Features Section */}
        <section className="container mx-auto my-12 px-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">⚡ Fast</h3>
            <p>Optimized for performance and speed.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">🎨 Stylish</h3>
            <p>Beautiful UI with Tailwind CSS.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">🚀 Lightweight</h3>
            <p>Built using Vite for an ultra-fast experience.</p>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p>&copy; 2025 My Vite App. All rights reserved.</p>
        </footer>
      </div>
    );
  }
  