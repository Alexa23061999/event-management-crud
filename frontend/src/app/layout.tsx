import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Manager",
  description: "Manage events with style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-32 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Header with glassmorphism effect */}
        <header className="relative z-10 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Event Manager
              </div>
            </div>
            
            <nav className="flex items-center space-x-2">
              <a 
                href="/events" 
                className="px-4 py-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Events
              </a>
              <a 
                href="/create" 
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Event
              </a>
            </nav>
          </div>
        </header>

        {/* Main content area */}
        <main className="relative z-10 container mx-auto px-6 py-12">
          <div className="backdrop-blur-sm bg-white/60 rounded-2xl shadow-xl border border-white/20 min-h-[60vh] p-8 transform hover:shadow-2xl transition-all duration-500">
            {children}
          </div>
        </main>

        {/* Footer with glassmorphism */}
        <footer className="relative z-10 mt-auto backdrop-blur-md bg-white/70 border-t border-white/20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>© {new Date().getFullYear()} Event Manager</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="text-xs">Built with passion</span>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-gray-900 transition-colors duration-300">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors duration-300">Terms</a>
                <a href="#" className="hover:text-gray-900 transition-colors duration-300">Support</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Custom styles moved to globals.css (styled-jsx isn't supported in Server Components) */}
      </body>
    </html>
  );
}