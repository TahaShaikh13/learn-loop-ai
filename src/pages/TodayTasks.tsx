import { useState, useEffect, useCallback } from "react";
import { useStudy } from "@/context/StudyContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Play, Pause, RotateCcw } from "lucide-react";

const TodayTasks = () => {
  const { todayTasks, markTaskComplete } = useStudy();
  const completedCount = todayTasks.filter((t) => t.completed).length;
  const progressPercent = todayTasks.length > 0 ? Math.round((completedCount / todayTasks.length) * 100) : 0;

  // Timer (25 min = 1500 seconds)
  const [timeLeft, setTimeLeft] = useState(1500);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [running, timeLeft]);

  const resetTimer = useCallback(() => { setTimeLeft(1500); setRunning(false); }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Today's Tasks</h1>
        <p className="text-muted-foreground">Your personalized study plan for today.</p>
      </div>

      {/* Timer */}
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Focus Timer</p>
        <p className="text-5xl font-mono font-bold mb-4">{formatTime(timeLeft)}</p>
        <div className="flex items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={() => setRunning(!running)}>
            {running ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {running ? "Pause" : "Start"}
          </Button>
          <Button size="sm" variant="ghost" onClick={resetTimer}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Daily Progress</span>
          <span className="text-sm text-muted-foreground">{completedCount}/{todayTasks.length}</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {todayTasks.map((task) => (
          <div key={task.id} className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${task.completed ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${task.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
              {task.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.content}</p>
              <p className="text-xs text-muted-foreground capitalize">{task.type} · {task.subjectName}</p>
            </div>
            {!task.completed && (
              <Button size="sm" variant="outline" onClick={() => markTaskComplete(task.id)}>
                Mark Done
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;
