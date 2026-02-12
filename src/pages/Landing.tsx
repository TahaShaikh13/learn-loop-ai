import { Link } from "react-router-dom";
import { BookOpen, Brain, Layers, CalendarCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Sparkles, title: "AI Summarization", desc: "Automatically condense lengthy notes into clear, structured summaries powered by NLP." },
  { icon: Brain, title: "MCQ Generator", desc: "AI generates practice questions from your material to test understanding and retention." },
  { icon: Layers, title: "Flashcards", desc: "Interactive flip cards auto-generated from key concepts for quick revision sessions." },
  { icon: CalendarCheck, title: "Daily Revision Scheduler", desc: "Spaced repetition algorithm creates a personalized 20–30 min daily study plan." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">L</div>
            <span className="text-xl font-bold">LearnLoop</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 lg:py-32 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI-Powered Learning Platform
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
          Automate Your Learning{" "}
          <span className="text-primary">with AI</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Upload your notes, set your exam date, and let AI create personalized daily revision plans with summaries, flashcards, and MCQs — just 20–30 minutes a day.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="gap-2 px-8">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="px-8">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20 lg:pb-32">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Everything You Need to Ace Your Exams</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powered by NLP and spaced repetition science to maximize your learning efficiency.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">LearnLoop</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 LearnLoop. AI-powered revision for every student.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
