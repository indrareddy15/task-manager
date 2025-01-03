import axios from "axios";

class TaskService {
  constructor() {
    this.apiUrl = "http://localhost:8082/tasks";
  }

  async fetchTasks() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async createTask(formData) {
    await axios.post(this.apiUrl, formData);
  }

  async updateTask(taskId, taskData) {
    await axios.patch(`${this.apiUrl}/${taskId}`, taskData);
  }

  async deleteTask(taskId) {
    await axios.delete(`${this.apiUrl}/${taskId}`);
  }

  async markTaskAsDone(taskId) {
    await axios.patch(`${this.apiUrl}/${taskId}`, { status: "DONE" });
  }
}

export default new TaskService();