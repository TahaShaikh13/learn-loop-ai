import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

const allCards = [
  { front: "What is Big O notation?", back: "A mathematical notation describing the upper bound of an algorithm's time or space complexity." },
  { front: "Define a linked list", back: "A linear data structure where elements are stored in nodes, each pointing to the next node." },
  { front: "What is recursion?", back: "A technique where a function calls itself to solve smaller instances of the same problem." },
  { front: "Explain polymorphism", back: "The ability of different objects to respond to the same method call in different ways." },
  { front: "What is a binary tree?", back: "A tree data structure where each node has at most two children: left and right." },
  { front: "Define encapsulation", back: "Bundling data and the methods that operate on it within a single unit, restricting direct access to some components." },
  { front: "What is a hash table?", back: "A data structure that maps keys to values using a hash function for fast lookup." },
  { front: "Explain DFS vs BFS", back: "DFS explores as deep as possible before backtracking; BFS explores all neighbors at the current depth first." },
];

const Flashcards = () => {
  const [cards, setCards] = useState(allCards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const shuffle = useCallback(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIndex(0);
    setFlipped(false);
  }, [cards]);

  return (
    <div className="animate-fade-in flex flex-col items-center max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-2 self-start">Flashcards</h1>
      <p className="text-muted-foreground mb-8 self-start">Click the card to reveal the answer.</p>

      <div className="flip-card w-full h-64 mb-4 cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <div className={`flip-card-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
          <div className="flip-card-front absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Question</p>
            <p className="text-lg font-medium">{cards[index].front}</p>
          </div>
          <div className="flip-card-back absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-xs text-primary mb-3 uppercase tracking-wider">Answer</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{cards[index].back}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">{index + 1} / {cards.length}</p>

      <div className="flex items-center gap-3">
        <Button variant="outline" disabled={index === 0} onClick={() => { setIndex(index - 1); setFlipped(false); }}>Previous</Button>
        <Button variant="outline" disabled={index === cards.length - 1} onClick={() => { setIndex(index + 1); setFlipped(false); }}>Next</Button>
        <Button variant="ghost" size="icon" onClick={shuffle} title="Shuffle">
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Flashcards;
