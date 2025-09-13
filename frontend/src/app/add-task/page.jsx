"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/auth";
import Layout from "../components/Layout";
import TaskForm from "../components/TaskForm";
import api from "../utils/axios";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (taskData) => {
    setLoading(true);
    try {
      await api.post("/tasks", taskData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Add New Task
          </h1>
          <TaskForm
            onSubmit={handleSubmit}
            loading={loading}
            buttonText="Add Task"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddTask;
