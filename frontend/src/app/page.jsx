export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Task Manager Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to your task management application
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
