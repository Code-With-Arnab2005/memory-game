export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 shadow-lg sticky top-0">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide">Memory Flip Game</h1>

        {/* Menu Items */}
        <div className="hidden sm:flex gap-6 text-gray-300">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">How to Play</a>
          <a href="/scores" className="hover:text-white transition">High Scores</a>
        </div>

        {/* Mobile Menu Icon (optional) */}
        <button className="sm:hidden text-gray-300 hover:text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}