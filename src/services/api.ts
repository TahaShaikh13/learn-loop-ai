import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("learnloop-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("learnloop-token");
      localStorage.removeItem("learnloop-user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const loginUser = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const registerUser = (name: string, email: string, password: string) =>
  api.post("/auth/register", { name, email, password });

export const uploadNotes = (formData: FormData) =>
  api.post("/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const fetchSubjects = () => api.get("/subjects");
export const fetchSubjectDetails = (id: string) => api.get(`/subject/${id}`);
export const fetchTodayTasks = () => api.get("/today");
export const submitMCQ = (answers: Record<string, string>) => api.post("/mcq/submit", { answers });

export default api;
