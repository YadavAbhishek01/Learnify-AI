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
    <div
      key={p.id}
      className="
        bg-white
        shadow-sm
        rounded-2xl
        p-4 sm:p-5
        border
        border-gray-100
        transition
        hover:shadow-md
      "
    >
      {/* Document Title */}
      <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 flex items-center gap-2">
        <span>📄</span>
        <span className="truncate">{p.document}</span>
      </h3>

      {/* Progress Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          📘 <span>Summary Read:</span>
          <span className={p.summaryRead ? "text-emerald-600 font-medium" : "text-red-500"}>
            {p.summaryRead ? "Yes" : "No"}
          </span>
        </p>

        <p className="flex items-center gap-2">
          🧠 <span>Flashcards Done:</span>
          <span className="font-medium">{p.flashcardsDone}</span>
        </p>

        <p className="flex items-center gap-2 sm:col-span-2">
          📝 <span>Quiz Score:</span>
          <span className="font-medium">{p.quizScore}%</span>
        </p>
      </div>
    </div>
  ))}
</div>
  );
}
