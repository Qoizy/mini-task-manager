"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/utils/auth";
import Layout from "../components/Layout";
import api from "../utils/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchTasks();
  }, [user, filter]);

  const fetchTasks = async () => {
    try {
      let url = "/tasks";
      if (filter !== "All") {
        url += `?status=${filter}`;
      }

      const response = await api.get(url);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: task.status === "Completed" ? "Pending" : "Completed",
      });
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
            <Link
              href="/add-task"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add New Task
            </Link>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <label
              htmlFor="filter"
              className="block text-sm font-medium text-gray-700 mr-2"
            >
              Filter by status:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Task List */}
          {loading ? (
            <div className="text-center py-12">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                {filter === "All"
                  ? "You don't have any tasks yet."
                  : `You don't have any ${filter.toLowerCase()} tasks.`}
              </p>
              <Link
                href="/add-task"
                className="inline-block mt-4 text-indigo-600 hover:text-indigo-500"
              >
                Create your first task
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {task.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {task.description}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => toggleTaskStatus(task)}
                        className={`text-sm ${
                          task.status === "Completed"
                            ? "text-yellow-600 hover:text-yellow-500"
                            : "text-green-600 hover:text-green-500"
                        }`}
                      >
                        {task.status === "Completed"
                          ? "Mark as Pending"
                          : "Mark as Completed"}
                      </button>
                      <Link
                        href={`/edit-task/${task._id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-sm text-red-600 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
