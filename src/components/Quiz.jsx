import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PdfContext } from "../context/Pdfcontext";
import { useParams } from "react-router-dom";

const QUESTION_TIME = 15;

const Quiz = () => {
  const { pdfid } = useParams();
  const { Quiz, SetProgress, SubmitQuiz, GenerateQuiz,loading } = useContext(PdfContext);

  const [showQuiz, setShowQuiz] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  // Initialize answers array when Quiz loads
  useEffect(() => {
    if (Quiz && Quiz.length) {
      setAnswers(Array(Quiz.length).fill(null));
    }
  }, [Quiz]);

  // Timer effect
  useEffect(() => {
    if (submitted || !showQuiz) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, showQuiz]);

  // Next question
  const handleNext = () => {
    if (!selected) {
      toast.error("Please select an option");
      return;
    }
    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);

    if (selected === Quiz[current].correctAnswer) setScore((prev) => prev + 1);
    setSelected("");
    setTimeLeft(QUESTION_TIME);
    setCurrent((prev) => prev + 1);
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (!selected) {
      toast.error("Please select an answer");
      return;
    }

    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);

    const newScore = score + (selected === Quiz[current].correctAnswer ? 1 : 0);
    setScore(newScore);
    setSubmitted(true);

    // Update progress in context & submit via API
    SetProgress(newScore);
    await SubmitQuiz(pdfid, newScore);
  };

  // Show generate quiz screen
  if (!showQuiz) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center bg-blue-50 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Ready to Test Your Knowledge?</h2>
        <p className="text-lg text-slate-700 mb-6">
          Click below to generate your quiz and test your knowledge!
        </p>
        <button
          onClick={async () => {
            await GenerateQuiz(pdfid);
            setShowQuiz(true);
          }}
        className={`px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
  disabled={loading}
        >
        {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    );
  }

  // Show quiz results
  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-emerald-700 mb-2">Quiz Completed 🎉</h2>
          <p className="text-lg mb-4">Your Score: {score} / {Quiz.length}</p>
        </div>

        <div className="mt-8 space-y-6">
          {Quiz.map((q, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 shadow-md">
              <p className="font-medium mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isCorrect = opt === q.correctAnswer;
                  const isUser = answers[i] === opt;
                  let cls = "px-3 py-2 rounded border";
                  if (isCorrect) cls += " bg-green-100 border-green-500";
                  if (isUser && !isCorrect) cls += " bg-red-100 border-red-500";
                  return <div key={idx} className={cls}>{opt}</div>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Quiz progress
  const progress = ((current + 1) / Quiz.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress + Timer */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-500 mb-1">
          <span>Question {current + 1} / {Quiz.length}</span>
          <span className="font-semibold">⏱ {timeLeft}s</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded">
          <div
            className="h-2 bg-emerald-600 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6 text-slate-800">
          {Quiz[current].question}
        </h3>

        <div className="space-y-3">
          {Quiz[current].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${selected === opt ? "border-emerald-600 bg-emerald-50" : "border-slate-200 hover:bg-slate-50"}`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          {current === Quiz.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
