import { Sparkles, BookOpen, HelpCircle } from "lucide-react";
import { useState, useCallback, useContext, useEffect } from "react";
import { PdfContext } from "../context/Pdfcontext";
import { useParams } from "react-router-dom";
import { SummaryModal } from "./SummaryModal";

const buttonBase =
  "px-4 py-2 rounded-xl text-white transition font-medium";

export default function AIAssistantPanel() {
  const [open, setOpen] = useState(false);
  const [concept, setConcept] = useState(""); // ✅ FIX
  const [modalType, setModalType] = useState(null);
  const {
    GenerateSummary,
    summary,
    loading,
    ExplainConcept, explanation, summaryLoading, explainLoading // ✅ FIX name
  } = useContext(PdfContext);


  const { pdfid } = useParams();

  // ======================
  // Explain Concept
  // ======================
  const handleExplain = useCallback(async () => {
    if (!concept.trim()) return;
    await ExplainConcept(pdfid, concept); // ✅ FIX
  }, [concept, pdfid]);

  // ======================
  // Generate Summary
  // ======================
  const handleSummary = async () => {
    if (summaryLoading) return;
    await GenerateSummary(pdfid);
  };

  useEffect(() => {
    if (summary) {
      setModalType("summary");
      setOpen(true);
    }
  }, [summary]);

  useEffect(() => {
    if (explanation) {
      setModalType("explain");
      setOpen(true);
    }
  }, [explanation]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
  <div className="rounded-2xl shadow-2xl p-4 sm:p-6 space-y-6 bg-white">

    {/* Header */}
    <header className="flex items-center gap-3">
      <div className="p-2 bg-emerald-100 rounded-xl">
        <Sparkles className="text-emerald-600" />
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-semibold">AI Assistant</h2>
        <p className="text-sm text-gray-500">
          Powered by advanced AI
        </p>
      </div>
    </header>

    {/* Summary */}
    <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-xl">
      <div className="flex items-center gap-3">
        <BookOpen className="text-blue-500" />
        <div>
          <h3 className="font-medium">Generate Summary</h3>
          <p className="text-sm text-gray-500">
            Get a concise summary of the entire document.
          </p>
        </div>
      </div>

      <button
        onClick={handleSummary}
        disabled={summaryLoading}
        className={`${buttonBase} w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60`}
      >
        {summaryLoading ? "Generating..." : "Generate Summary"}
      </button>
    </section>

    {/* Explain Concept */}
    <section className="p-4 border rounded-xl space-y-3">
      <div className="flex items-center gap-3">
        <HelpCircle className="text-yellow-500" />
        <div>
          <h3 className="font-medium">Explain a Concept</h3>
          <p className="text-sm text-gray-500">
            Enter a topic from the document.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Enter concept (e.g. Middleware)"
          className="flex-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={handleExplain}
          disabled={explainLoading}
          className={`${buttonBase} w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50`}
        >
          {explainLoading ? "Explaining..." : "Explain"}
        </button>

      </div>
    </section>
  </div>
</div>

      {/* Summary Modal */}
      <SummaryModal
        modalType={modalType}
        summary={modalType === "summary" ? summary : null}
        explanation={modalType === "explain" ? explanation : null}
        onClose={() => {
          setOpen(false);
          setModalType(null);
        }}
      />


    </>
  );
}
