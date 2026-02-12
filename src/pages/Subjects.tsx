import { Link } from "react-router-dom";
import { useStudy } from "@/context/StudyContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Subjects = () => {
  const { subjects } = useStudy();

  if (subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">No subjects yet</h2>
        <p className="text-muted-foreground mb-6">Upload your notes to get started.</p>
        <Link to="/upload"><Button>Upload Notes</Button></Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">My Subjects</h1>
      <p className="text-muted-foreground mb-8">Track your study progress across all subjects.</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => {
          const daysLeft = Math.max(0, Math.ceil((new Date(s.examDate).getTime() - Date.now()) / 86400000));
          return (
            <div key={s.id} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Exam in {daysLeft} days</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium">{s.progress}%</span>
              </div>
              <Progress value={s.progress} className="h-2 mb-4" />
              <div className="flex gap-3 text-xs text-muted-foreground mb-4">
                <span>{s.totalCards} cards</span>
                <span>{s.totalMcqs} MCQs</span>
              </div>
              <Link to={`/subjects/${s.id}`}>
                <Button variant="outline" size="sm" className="w-full">View Details</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subjects;
