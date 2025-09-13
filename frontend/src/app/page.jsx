import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
          Task<span className="text-blue-600"> Manager</span>
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/login">
            <button className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform">
              Register
            </button>
          </Link>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Organize, Track, <br className="hidden sm:block" />
              and{" "}
              <span className="text-blue-600 relative">
                Get Things Done
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 opacity-50 rounded-full"></span>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">
              A simple, powerful dashboard to manage your tasks with ease. Stay
              productive and never lose track of what matters most.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto md:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-xs text-gray-500">Tasks Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-gray-500">Accessibility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99%</div>
                <div className="text-xs text-gray-500">Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-2 sm:gap-3 sm:gap-4 justify-center md:justify-start">
              <Link href="/register">
                <button className="bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center space-x-1 sm:space-x-2 whitespace-nowrap min-w-[120px] sm:min-w-[140px] text-sm sm:text-base">
                  <span>Get Started Free</span>
                  <svg
                    className="w-3 sm:w-4 h-3 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>

              <Link href="/login">
                <button className="border-2 border-gray-300 text-gray-700 px-4 py-1.5 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 rounded-lg font-medium hover:border-blue-300 hover:text-blue-700 transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 whitespace-nowrap min-w-[120px] sm:min-w-[140px] text-sm sm:text-base">
                  <span>Existing Account</span>
                  <svg
                    className="w-3 sm:w-4 h-3 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 bg-blue-200 rounded-full opacity-20 absolute -top-10 -left-10"></div>
              <div className="w-64 h-64 bg-blue-100 rounded-2xl p-6 relative z-10 shadow-xl">
                <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-200 h-2 rounded"></div>
                  </div>
                  <div className="mt-2 bg-gray-100 h-4 rounded"></div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-200 h-2 rounded"></div>
                  </div>
                  <div className="mt-2 bg-gray-100 h-3 rounded"></div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-200 h-2 rounded"></div>
                  </div>
                  <div className="mt-2 bg-gray-100 h-3 rounded"></div>
                </div>
              </div>
              <div className="w-40 h-40 bg-blue-300 rounded-full opacity-30 absolute -bottom-5 -right-5"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            © 2025 TaskManager. Built by Quyum.
          </p>
        </div>
      </footer>
    </div>
  );
}
