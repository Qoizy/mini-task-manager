"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/utils/auth";
import Layout from "@/app/components/Layout";
import TaskForm from "@/app/components/TaskForm";
import api from "@/app/utils/axios";

export default function EditTask() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("EditTask mounted with params:", params);
    console.log("Task ID:", taskId);
    console.log("User:", user);

    if (!user) {
      console.log("No user, redirecting to login");
      router.push("/login");
      return;
    }

    if (taskId) {
      console.log("Fetching task with ID:", taskId);
      fetchTask();
    } else {
      console.error("Task ID is missing from URL parameters");
      setLoading(false);
      setError("Task ID is missing from the URL");
    }
  }, [taskId, user, router]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Making API call to:", `/tasks/${taskId}`);

      const response = await api.get(`/tasks/${taskId}`);
      console.log("API response:", response.data);

      if (response.data.success) {
        setTask(response.data.data);
        console.log("Task data set:", response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch task");
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      console.error("Error response:", error.response?.data);

      let errorMessage = "Failed to load task";
      if (error.response?.status === 404) {
        errorMessage = "Task not found";
      } else if (error.response?.status === 401) {
        errorMessage = "Not authorized to view this task";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (taskData) => {
    setLoading(true);
    try {
      await api.put(`/tasks/${taskId}`, taskData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading task...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Back to Dashboard
              </button>
              <button
                onClick={fetchTask}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
          <TaskForm
            onSubmit={handleSubmit}
            loading={loading}
            initialData={task}
            buttonText="Update Task"
          />
        </div>
      </div>
    </Layout>
  );
}
