

# LearnLoop — AI-Powered Learning Platform

## Overview
A modern, professional SaaS-style frontend for an AI-powered learning platform where students upload academic materials and receive personalized daily study plans with summaries, flashcards, MCQs, and spaced revision schedules.

---

## Pages & Features

### 1. Landing Page (`/`)
- Hero section with "Automate Your Learning with AI" headline and CTA buttons
- Feature cards: AI Summarization, MCQ Generator, Flashcards, Daily Revision Scheduler
- Clean footer with project info
- Smooth fade-in animations

### 2. Authentication (`/login`, `/register`)
- Login form with email, password, remember me, and validation
- Registration form with name, email, password, confirm password, and validation
- Toast notifications for errors/success
- Redirect to dashboard on success

### 3. Dashboard (`/dashboard`)
- **Sidebar layout** with collapsible navigation (Overview, Upload Notes, My Subjects, Today's Tasks, MCQ Practice, Flashcards, Profile)
- **Top navbar** with user info, dark mode toggle, and logout
- **Overview panel**: Exam countdown timer, today's study time indicator, animated progress bar, subject cards, recent activity feed

### 4. Upload Notes (`/upload`)
- File upload zone (PDF, DOCX) with drag & drop
- Subject name input, exam date picker, study duration selector
- Loading animation simulating AI processing
- Success toast on completion
- Calls `POST /api/upload`

### 5. My Subjects (`/subjects`)
- Grid of subject cards showing name, exam date, progress percentage
- "View Details" button on each card

### 6. Subject Detail (`/subjects/:id`)
- Tabbed interface: Summary, Flashcards, MCQs, Revision Plan
- Summary tab: structured AI-generated summary display
- Flashcards tab: interactive flip-animation cards
- MCQs tab: multiple choice UI with score tracking
- Revision Plan tab: timeline-based daily schedule

### 7. Today's Tasks (`/today`)
- Today's summary, flashcards, and 5 MCQs
- 25-minute focus mode timer
- "Mark as Completed" button

### 8. MCQ Practice (`/practice`)
- Dynamic MCQ rendering with answer selection
- Score display after submission
- Explanation toggle per question
- Progress tracker

### 9. Flashcards (`/flashcards`)
- Interactive flip cards with front/back
- Next/Previous navigation and shuffle option

### 10. Profile (`/profile`)
- User info display and edit
- Update password form
- Study preferences
- Dark/light mode toggle

---

## Design & UX
- **Style**: Modern SaaS, minimal, soft shadows, rounded cards, clean typography
- **Colors**: Primary `#4F46E5` (indigo), Secondary `#06B6D4` (cyan), Accent `#22C55E` (green)
- **Polish**: Skeleton loaders, toast notifications, loading spinners, error states, empty states
- **Responsive**: Mobile-first with collapsible sidebar, responsive grids, touch-friendly buttons
- **Dark mode**: Full dark/light toggle with persistent preference

## Architecture
- **Routing**: React Router with protected routes and lazy loading
- **State**: Context API for Auth (user, token) and Study (subjects, progress, tasks)
- **API layer**: Axios service module with base URL, interceptors, and token handling — mock responses for development
- **Reusable components**: Button, Card, Modal, Loader, Input, FileUpload

