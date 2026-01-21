import { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PdfContext } from "../context/Pdfcontext";
import { Link, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
const FlashCardDetails = () => {
  const { allcard, GetFlashcardsByPdfId, loading } = useContext(PdfContext);
  const { id } = useParams();

  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // ✅ fetch flashcards on page load
  useEffect(() => {
    const pdfId = JSON.parse(localStorage.getItem("pdfId"));
    if (pdfId) {
      GetFlashcardsByPdfId(pdfId);
    }
  }, []);

  const currentCard = allcard.find((card) => card._id === id);

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white  rounded-3xl p-8 max-w-md text-center">
        
        <div className="h-12 w-12 mx-auto mb-4 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600"></div>

        <h2 className="text-lg font-semibold mb-1">
          Loading Flashcards
        </h2>

        <p className="text-slate-600 text-sm">
          Preparing smart flashcards from your document...
        </p>
      </div>
    </div>
  );
}


 if (!currentCard) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white border rounded-3xl shadow-sm p-8 max-w-md text-center">
        
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl">
          🗂
        </div>

        <h2 className="text-xl font-semibold mb-2">
          No Flashcards Available
        </h2>

        <p className="text-slate-600 text-sm mb-6">
          You haven’t generated any flashcards yet. Upload a PDF and let AI
          create flashcards for you automatically.
        </p>

        <Link
          to="/documents"
          className="inline-block px-6 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
        >
          Generate Flashcards
        </Link>
      </div>
    </div>
  );
}

  const { question, answer } = currentCard.content[current];

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-6">
  <div className="w-full max-w-3xl">
    {/* Flashcard */}
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective-distant"
    >
      <div
        className={`relative h-88 transition-transform duration-500 transform-3d
        ${flipped ? "transform-[rotateY(180deg)]" : ""}`}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-3xl bg-white p-20
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          flex flex-col justify-between
          backface-hidden"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
              Question
            </span>

            <p className="mt-6 text-2xl font-semibold text-gray-900 leading-snug">
              {question}
            </p>
          </div>

          <div className="flex justify-end">
            <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs text-emerald-600">
              Click to reveal answer
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-3xl p-10
          bg-linear-to-br from-emerald-500 to-teal-500
          shadow-[0_20px_60px_rgba(16,185,129,0.35)]
          flex flex-col justify-between
          backface-hidden
          transform-[rotateY(180deg)]"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-100">
              Answer
            </span>

            <p className="mt-6 text-xl font-medium text-white leading-relaxed">
              {answer}
            </p>
          </div>

          <div className="flex justify-end">
            <span className="rounded-full bg-white/20 px-4 py-1 text-xs text-white">
              Click to go back
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Navigation */}
    <div className="mt-10 flex items-center justify-between">
      <button
        disabled={current === 0}
        onClick={() => {
          setCurrent((c) => c - 1);
          setFlipped(false);
        }}
        className="h-11 w-11 rounded-full flex items-center justify-center
        border border-emerald-300 text-emerald-600
        hover:bg-emerald-100 disabled:opacity-40 transition"
      >
        <ChevronLeft />
      </button>

      <span className="text-sm font-medium text-gray-600">
        {current + 1} / {currentCard.content.length}
      </span>

      <button
        disabled={current === currentCard.content.length - 1}
        onClick={() => {
          setCurrent((c) => c + 1);
          setFlipped(false);
        }}
        className="h-11 w-11 rounded-full flex items-center justify-center
        border border-emerald-300 text-emerald-600
        hover:bg-emerald-100 disabled:opacity-40 transition"
      >
        <ChevronRight />
      </button>
    </div>
  </div>
</div>


  );
};

export default FlashCardDetails;
