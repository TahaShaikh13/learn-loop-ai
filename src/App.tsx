import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { StudyProvider } from "@/context/StudyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "./pages/NotFound";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const UploadPage = lazy(() => import("@/pages/UploadPage"));
const Subjects = lazy(() => import("@/pages/Subjects"));
const SubjectDetail = lazy(() => import("@/pages/SubjectDetail"));
const TodayTasks = lazy(() => import("@/pages/TodayTasks"));
const Practice = lazy(() => import("@/pages/Practice"));
const Flashcards = lazy(() => import("@/pages/Flashcards"));
const Profile = lazy(() => import("@/pages/Profile"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <StudyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/subjects/:id" element={<SubjectDetail />} />
                    <Route path="/today" element={<TodayTasks />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </StudyProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
