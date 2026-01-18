import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DocumentChat from "./DocumentChat";
import { PdfContext } from "../context/Pdfcontext";
import AIAssistantPanel from "../components/AIAssistantPanel";
import  FlashCard  from "../components/FlashCard";
import  Quiz  from "../components/Quiz";

const TABS = ["Content", "Chat", "AI Actions", "Flashcards", "Quizzes"];

export default function DocumentDetail() {
  const [activeTab, setActiveTab] = useState("Content");
  const [currentPdf, setCurrentPdf] = useState(null);

  const { pdfdata, getPdfById } = useContext(PdfContext);
  const { pdfid } = useParams();
   localStorage.setItem("pdfId",JSON.stringify(pdfid))
  const navigate = useNavigate();

  // 🔹 Fetch PDFs if user refreshes page
  useEffect(() => {
    if (pdfdata.length === 0) {
      getPdfById();
    }
  }, []);

  // 🔹 Find selected PDF once data is ready
  useEffect(() => {
    if (pdfdata.length && pdfid) {
      const found = pdfdata.find((doc) => doc._id === pdfid);
      setCurrentPdf(found || null);
    }
  }, [pdfdata, pdfid]);

  if (!currentPdf) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading document...
      </div>
    );
  }
// If no PDF uploaded at all
if (pdfdata && pdfdata.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      No PDF uploaded. Please upload a PDF first.
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 md:px-10 md:py-8">
  
  {/* Back Button */}
  <button
    onClick={() => navigate("/documents")}
    className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
  >
    ← Back to Documents
  </button>

  {/* Title */}
  <h1 className="mb-6 text-2xl font-semibold text-gray-900">
    {currentPdf.originalName}
  </h1>

  {/* Tabs */}
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex gap-8 text-sm font-medium">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 ${
            activeTab === tab
              ? "text-emerald-600 border-b-2 border-emerald-500"
              : "text-gray-500 border-b-2 border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  </div>

  {/* Content */}
  <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
    {activeTab === "Content" && (
      <>
        <div className="flex justify-between border-b pb-3">
          <h2 className="text-sm font-semibold">Document Viewer</h2>
          <a
            href={currentPdf.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-600"
          >
            Open in new tab ↗
          </a>
        </div>

        <div className="h-[80vh] mt-4 rounded-xl overflow-hidden bg-gray-900">
          <iframe
            src={currentPdf.fileUrl}
            className="w-full h-full"
            title="PDF Viewer"
          />
        </div>
      </>
    )}

    {/* Chat */}
    {activeTab === "Chat" && <DocumentChat pdfId={pdfid} />}

    {/* AI Actions */}
    {activeTab === "AI Actions" && <AIAssistantPanel />}

    {/* Flashcards */}
    {activeTab === "Flashcards" && <FlashCard />}

    {/* Quizzes */}
    {activeTab === "Quizzes" && <Quiz />}
    
  </div>
</div>
  );
}
