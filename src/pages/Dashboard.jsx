import { useContext, useEffect } from "react";
import { PdfContext } from "../context/Pdfcontext";






export default function Dashboard() {
   const {pdfdata}=useContext(PdfContext)
   const {allcard}=useContext(PdfContext)
   
const stats = [
  { label: "TOTAL DOCUMENTS",  iconBg: "bg-blue-500" ,value:pdfdata.length},
  { label: "TOTAL FLASHCARDS", iconBg: "bg-pink-500",value:allcard.length },
  { label: "TOTAL QUIZZES",  iconBg: "bg-green-500" },
];

const recentActivity = [
  {
    id: 1,
    title: "Accessed Document: React Concepts Detailed",
    date: "23/11/2025, 21:41:10",
  },
  {
    id: 2,
    title:
      "Accessed Document: A Comprehensive CSS Guide to Styling the Modern Web",
    date: "23/11/2025, 21:39:55",
  },
];
  return (
   <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 md:px-10">
  {/* Header */}
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <p className="mt-1 text-sm text-gray-500">
      Track your learning progress and activity
    </p>
  </div>

  {/* Stats Cards */}
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {stats.map((item) => (
      <div
        key={item.label}
        className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm"
      >
        <div>
          <p className="text-xs font-medium tracking-wide text-gray-400">
            {item.label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-gray-900">
            {item.label === "TOTAL DOCUMENTS"
              ? item.value
              : item.label === "TOTAL FLASHCARDS"
                ? item.value
                : item.label === "TOTAL QUIZZES"
                  ? 1
                  : 0}

               
          </p>
        </div>
        <div
          className={`${item.iconBg} flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg`}
        >
          {/* Replace with any icon, e.g., Heroicons */}
          <span className="text-xl text-white">📄</span>
        </div>
      </div>
    ))}
  </div>

  {/* Recent Activity */}
  <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
        <span className="text-lg">🕒</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
    </div>

    <div className="space-y-3">
      {recentActivity.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-sm"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <p className="font-medium text-gray-800">{activity.title}</p>
            </div>
            <p className="mt-1 pl-4 text-xs text-gray-500">{activity.date}</p>
          </div>
          <button className="text-sm font-medium text-sky-600 hover:underline">
            View
          </button>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}
