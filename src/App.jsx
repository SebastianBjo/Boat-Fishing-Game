import { useState } from 'react';
          import { ChevronRight, Moon, Sun, Menu, X } from 'lucide-react';
          import './App.css';
          
          function App() {
            const [darkMode, setDarkMode] = useState(false);
            const [menuOpen, setMenuOpen] = useState(false);
            
            const toggleDarkMode = () => {
              setDarkMode(!darkMode);
              document.documentElement.classList.toggle('dark');
            };
            
            return (
              <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <header className="border-b border-gray-200 dark:border-gray-800">
                  <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-bold">CodeAI Studio</h1>
                      
                      <div className="flex items-center space-x-4">
                        {/* Dark mode toggle */}
                        <button 
                          onClick={toggleDarkMode}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        
                        {/* Mobile menu button */}
                        <button 
                          onClick={() => setMenuOpen(!menuOpen)}
                          className="md:hidden p-2"
                        >
                          {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
                          <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
                        </nav>
                      </div>
                    </div>
                    
                    {/* Mobile menu */}
                    {menuOpen && (
                      <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                        <nav className="flex flex-col space-y-4">
                          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
                          <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
                        </nav>
                      </div>
                    )}
                  </div>
                </header>
                
                <main className="container mx-auto px-4 py-12">
                  <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Welcome to CodeAI Studio</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">A minimal starter template to build anything</p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center">
                      Get Started <ChevronRight size={16} className="ml-1" />
                    </button>
                  </section>
                </main>
                
                <footer className="border-t border-gray-200 dark:border-gray-800">
                  <div className="container mx-auto px-4 py-6 text-center">
                    &copy; {new Date().getFullYear()} CodeAI Studio
                  </div>
                </footer>
              </div>
            );
          }
          
          export default App;