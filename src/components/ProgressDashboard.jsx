export const demoProgress = [
  {
    id: 1,
    document: "React Basics.pdf",
    summaryRead: true,
    flashcardsDone: 5,
    quizScore: 80,
  },
  {
    id: 2,
    document: "Advanced Hooks.pdf",
    summaryRead: false,
    flashcardsDone: 2,
    quizScore: 40,
  },
];


export function ProgressDashboard({ progress }) {
  if (!demoProgress.length) {
    return <p className="text-gray-500">No progress data yet.</p>;
  }

  return (
    <div className="space-y-4">
      {demoProgress.map((p) => (
        <div key={p.id} className="bg-white shadow rounded p-4">
          <h3 className="font-bold">📄 {p.document}</h3>
          <p>📘 Summary Read: {p.summaryRead ? "Yes" : "No"}</p>
          <p>🧠 Flashcards Done: {p.flashcardsDone}</p>
          <p>📝 Quiz Score: {p.quizScore}%</p>
        </div>
      ))}
    </div>
  );
}
