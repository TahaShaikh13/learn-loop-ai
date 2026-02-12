import React, { createContext, useContext, useState } from "react";

export interface Subject {
  id: string;
  name: string;
  examDate: string;
  progress: number;
  totalCards: number;
  totalMcqs: number;
  uploadedAt: string;
}

export interface TodayTask {
  id: string;
  type: "summary" | "flashcard" | "mcq";
  subjectName: string;
  completed: boolean;
  content: string;
}

interface StudyContextType {
  subjects: Subject[];
  todayTasks: TodayTask[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  setTodayTasks: React.Dispatch<React.SetStateAction<TodayTask[]>>;
  addSubject: (subject: Subject) => void;
  markTaskComplete: (taskId: string) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

const mockSubjects: Subject[] = [
  { id: "1", name: "Machine Learning", examDate: "2026-03-15", progress: 65, totalCards: 48, totalMcqs: 30, uploadedAt: "2026-02-01" },
  { id: "2", name: "Data Structures", examDate: "2026-03-20", progress: 40, totalCards: 36, totalMcqs: 25, uploadedAt: "2026-02-05" },
  { id: "3", name: "Operating Systems", examDate: "2026-04-01", progress: 20, totalCards: 52, totalMcqs: 35, uploadedAt: "2026-02-10" },
];

const mockTasks: TodayTask[] = [
  { id: "t1", type: "summary", subjectName: "Machine Learning", completed: false, content: "Review Neural Networks chapter summary" },
  { id: "t2", type: "flashcard", subjectName: "Machine Learning", completed: false, content: "Practice 10 flashcards on backpropagation" },
  { id: "t3", type: "mcq", subjectName: "Data Structures", completed: false, content: "Complete 5 MCQs on Binary Trees" },
  { id: "t4", type: "flashcard", subjectName: "Data Structures", completed: false, content: "Review 8 flashcards on graph traversal" },
  { id: "t5", type: "summary", subjectName: "Operating Systems", completed: false, content: "Read process scheduling summary" },
];

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [todayTasks, setTodayTasks] = useState<TodayTask[]>(mockTasks);

  const addSubject = (subject: Subject) => setSubjects((prev) => [...prev, subject]);

  const markTaskComplete = (taskId: string) =>
    setTodayTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)));

  return (
    <StudyContext.Provider value={{ subjects, todayTasks, setSubjects, setTodayTasks, addSubject, markTaskComplete }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used within StudyProvider");
  return ctx;
};
