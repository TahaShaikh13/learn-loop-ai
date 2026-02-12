import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

const questions = [
  { id: "1", question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, explanation: "Binary search halves the search space with each step, resulting in O(log n) complexity." },
  { id: "2", question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], correct: 1, explanation: "Queue follows First In First Out (FIFO) ordering." },
  { id: "3", question: "What is a hash collision?", options: ["Two keys map to the same index", "Memory overflow", "Stack overflow", "Segfault"], correct: 0, explanation: "A hash collision occurs when two different keys produce the same hash value and map to the same index." },
  { id: "4", question: "Which traversal visits root first?", options: ["Inorder", "Preorder", "Postorder", "Level-order"], correct: 1, explanation: "Preorder traversal visits the root node before its left and right subtrees." },
  { id: "5", question: "Best case of quicksort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], correct: 1, explanation: "When the pivot divides the array into two equal halves, quicksort runs in O(n log n)." },
];

const Practice = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const score = submitted ? questions.filter((q) => answers[q.id] === q.correct).length : 0;

  const reset = () => { setAnswers({}); setSubmitted(false); setShowExplanation({}); };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">MCQ Practice</h1>
      <p className="text-muted-foreground mb-8">Test your knowledge with AI-generated questions.</p>

      {submitted && (
        <div className="rounded-xl border border-border bg-card p-6 mb-8 text-center">
          <p className="text-3xl font-bold mb-1">{score}/{questions.length}</p>
          <p className="text-muted-foreground text-sm mb-3">{Math.round((score / questions.length) * 100)}% correct</p>
          <Progress value={(score / questions.length) * 100} className="h-2 mb-4" />
          <Button variant="outline" onClick={reset}>Try Again</Button>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={q.id} className="rounded-xl border border-border bg-card p-5">
            <p className="font-medium mb-3">{qi + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                const isCorrect = submitted && oi === q.correct;
                const isWrong = submitted && selected && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                    className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                      isCorrect ? "border-accent bg-accent/10" :
                      isWrong ? "border-destructive bg-destructive/10" :
                      selected ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isCorrect && <CheckCircle className="h-4 w-4 text-accent" />}
                      {isWrong && <XCircle className="h-4 w-4 text-destructive" />}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
            {submitted && (
              <button
                className="flex items-center gap-1 text-sm text-primary mt-3 hover:underline"
                onClick={() => setShowExplanation({ ...showExplanation, [q.id]: !showExplanation[q.id] })}
              >
                {showExplanation[q.id] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                Explanation
              </button>
            )}
            {showExplanation[q.id] && (
              <p className="text-sm text-muted-foreground mt-2 pl-2 border-l-2 border-primary/30">{q.explanation}</p>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <Button className="mt-6 w-full" onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}>
          Submit Answers
        </Button>
      )}
    </div>
  );
};

export default Practice;
