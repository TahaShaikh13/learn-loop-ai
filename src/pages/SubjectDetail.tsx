import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStudy } from "@/context/StudyContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

const mockSummary = [
  { title: "Introduction", content: "This chapter covers the foundational concepts and terminology. Key definitions and historical context are established." },
  { title: "Core Concepts", content: "The main theoretical framework is built upon three pillars: data representation, algorithmic processing, and optimization techniques." },
  { title: "Applications", content: "Real-world applications span healthcare diagnostics, financial modeling, natural language understanding, and autonomous systems." },
  { title: "Key Takeaways", content: "Focus on understanding the mathematical foundations and their practical implications for problem-solving." },
];

const mockFlashcards = [
  { front: "What is supervised learning?", back: "A type of ML where the model learns from labeled training data to make predictions on new data." },
  { front: "Define overfitting", back: "When a model learns the training data too well, including noise, and performs poorly on unseen data." },
  { front: "What is gradient descent?", back: "An optimization algorithm that iteratively adjusts parameters to minimize the loss function." },
  { front: "What is a neural network?", back: "A computing system inspired by biological neural networks, consisting of interconnected nodes organized in layers." },
];

const mockMcqs = [
  { id: "1", question: "Which algorithm is used for classification?", options: ["Linear Regression", "Decision Tree", "K-Means", "PCA"], correct: 1 },
  { id: "2", question: "What does CNN stand for?", options: ["Central Neural Network", "Convolutional Neural Network", "Computed Node Network", "Core Neuron Nexus"], correct: 1 },
  { id: "3", question: "Overfitting can be reduced by:", options: ["Adding more features", "Reducing training data", "Regularization", "Increasing model complexity"], correct: 2 },
];

const mockRevision = [
  { day: "Day 1", task: "Read summary & key definitions", done: true },
  { day: "Day 2", task: "Practice flashcards (Set 1)", done: true },
  { day: "Day 3", task: "Complete MCQ quiz 1", done: false },
  { day: "Day 4", task: "Review weak areas from quiz", done: false },
  { day: "Day 5", task: "Flashcards revision (all sets)", done: false },
  { day: "Day 6", task: "Final MCQ assessment", done: false },
];

const SubjectDetail = () => {
  const { id } = useParams();
  const { subjects } = useStudy();
  const subject = subjects.find((s) => s.id === id);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  if (!subject) {
    return <div className="py-20 text-center text-muted-foreground">Subject not found.</div>;
  }

  const mcqScore = mcqSubmitted
    ? mockMcqs.filter((q) => mcqAnswers[q.id] === q.correct).length
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{subject.name}</h1>
        <p className="text-muted-foreground">Exam: {subject.examDate} · Progress: {subject.progress}%</p>
      </div>

      <Tabs defaultValue="summary">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="mcqs">MCQs</TabsTrigger>
          <TabsTrigger value="revision">Revision Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="space-y-4">
            {mockSummary.map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flashcards">
          <div className="flex flex-col items-center">
            <div className="flip-card w-full max-w-md h-56 mb-6 cursor-pointer" onClick={() => setFlipped(!flipped)}>
              <div className={`flip-card-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
                <div className="flip-card-front absolute inset-0 flex items-center justify-center rounded-xl border border-border bg-card p-6 text-center">
                  <p className="font-medium">{mockFlashcards[currentCard].front}</p>
                </div>
                <div className="flip-card-back absolute inset-0 flex items-center justify-center rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
                  <p className="text-sm text-muted-foreground">{mockFlashcards[currentCard].back}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{currentCard + 1} / {mockFlashcards.length} · Click to flip</p>
            <div className="flex gap-3">
              <Button variant="outline" disabled={currentCard === 0} onClick={() => { setCurrentCard(currentCard - 1); setFlipped(false); }}>Previous</Button>
              <Button variant="outline" disabled={currentCard === mockFlashcards.length - 1} onClick={() => { setCurrentCard(currentCard + 1); setFlipped(false); }}>Next</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mcqs">
          <div className="space-y-6 max-w-2xl">
            {mockMcqs.map((q, qi) => (
              <div key={q.id} className="rounded-xl border border-border bg-card p-5">
                <p className="font-medium mb-3">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = mcqAnswers[q.id] === oi;
                    const isCorrect = mcqSubmitted && oi === q.correct;
                    const isWrong = mcqSubmitted && selected && oi !== q.correct;
                    return (
                      <button
                        key={oi}
                        disabled={mcqSubmitted}
                        onClick={() => setMcqAnswers({ ...mcqAnswers, [q.id]: oi })}
                        className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                          isCorrect ? "border-accent bg-accent/10 text-accent" :
                          isWrong ? "border-destructive bg-destructive/10 text-destructive" :
                          selected ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isCorrect && <CheckCircle className="h-4 w-4" />}
                          {isWrong && <XCircle className="h-4 w-4" />}
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!mcqSubmitted ? (
              <Button onClick={() => setMcqSubmitted(true)} disabled={Object.keys(mcqAnswers).length < mockMcqs.length}>
                Submit Answers
              </Button>
            ) : (
              <div className="rounded-xl border border-border bg-card p-5 text-center">
                <p className="text-xl font-bold">Score: {mcqScore}/{mockMcqs.length}</p>
                <p className="text-sm text-muted-foreground mt-1">{Math.round((mcqScore / mockMcqs.length) * 100)}% correct</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="revision">
          <div className="max-w-lg space-y-3">
            {mockRevision.map((r, i) => (
              <div key={i} className={`flex items-center gap-4 rounded-xl border p-4 ${r.done ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${r.done ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {r.done ? "✓" : i + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{r.day}</p>
                  <p className="text-sm text-muted-foreground">{r.task}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubjectDetail;
