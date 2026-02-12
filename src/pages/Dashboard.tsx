import { useStudy } from "@/context/StudyContext";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, TrendingUp, CalendarClock } from "lucide-react";

const Dashboard = () => {
  const { subjects, todayTasks } = useStudy();
  const completedTasks = todayTasks.filter((t) => t.completed).length;

  const getCountdown = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nearestExam = subjects.reduce(
    (min, s) => {
      const days = getCountdown(s.examDate);
      return days < min.days ? { name: s.name, days } : min;
    },
    { name: "", days: Infinity }
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
        <p className="text-muted-foreground">Here's your study overview for today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarClock} label="Next Exam" value={nearestExam.days < Infinity ? `${nearestExam.days} days` : "—"} sub={nearestExam.name} color="text-primary" />
        <StatCard icon={Clock} label="Today's Study" value="25 min" sub="Recommended session" color="text-secondary" />
        <StatCard icon={TrendingUp} label="Tasks Done" value={`${completedTasks}/${todayTasks.length}`} sub="Today's progress" color="text-accent" />
        <StatCard icon={BookOpen} label="Subjects" value={String(subjects.length)} sub="Active courses" color="text-primary" />
      </div>

      {/* Overall progress */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Overall Study Progress</h3>
        <div className="space-y-4">
          {subjects.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.progress}%</span>
              </div>
              <Progress value={s.progress} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Subject cards */}
      <div>
        <h3 className="font-semibold mb-4">Your Subjects</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <div key={s.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-1">{s.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">Exam in {getCountdown(s.examDate)} days</p>
              <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                <span>{s.totalCards} flashcards</span>
                <span>{s.totalMcqs} MCQs</span>
              </div>
              <Progress value={s.progress} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { text: "Completed ML flashcards session", time: "2 hours ago" },
            { text: "Scored 80% on Data Structures MCQ", time: "Yesterday" },
            { text: "Uploaded Operating Systems notes", time: "2 days ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
              <span>{a.text}</span>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string; sub: string; color: string }) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Icon className={`h-5 w-5 ${color}`} />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs text-muted-foreground mt-1">{sub}</p>
  </div>
);

export default Dashboard;
