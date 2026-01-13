import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Brain, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { PdfContext } from "../context/Pdfcontext";

const MAX_FLASHCARDS = 2;

const FlashCard = () => {
  const {
    GenerateFlashCardByPdfId,
    loading,
    allcard,
    GetFlashcardsByPdfId,
  } = useContext(PdfContext);

  const { pdfid } = useParams();

  // UI state per deck
  const [uiState, setUiState] = useState({});

  useEffect(() => {
    GetFlashcardsByPdfId(pdfid);
  }, [pdfid]);

  const generateFlashcard = async () => {
    if (allcard.length >= MAX_FLASHCARDS) {
      toast.error(`You can generate only ${MAX_FLASHCARDS} flashcards`);
      return;
    }
    await GenerateFlashCardByPdfId(pdfid);
  };

  const toggleFlip = (id) => {
    setUiState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        flipped: !prev[id]?.flipped,
      },
    }));
  };

  const next = (id, length) => {
    setUiState((prev) => ({
      ...prev,
      [id]: {
        current: Math.min((prev[id]?.current || 0) + 1, length - 1),
        flipped: false,
      },
    }));
  };

  const prev = (id) => {
    setUiState((prev) => ({
      ...prev,
      [id]: {
        current: Math.max((prev[id]?.current || 0) - 1, 0),
        flipped: false,
      },
    }));
  };

  return (
   <div className="p-4 sm:p-6 bg-emerald-50 min-h-screen">
  {allcard.length > 0 ? (
    <>
      {/* Generate Button */}
      <div className="flex justify-center sm:justify-end mb-6">
        <button
          onClick={generateFlashcard}
          className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Generate Flashcard
        </button>
      </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading
          ? "Loading..."
          : allcard.map((deck) => {
              const current = uiState[deck._id]?.current || 0;
              const flipped = uiState[deck._id]?.flipped || false;

              return (
                <div key={deck._id} className="group">
                  {/* CARD */}
                  <div
                    className="perspective cursor-pointer"
                    onClick={() => toggleFlip(deck._id)}
                  >
                    <div
                      className={`relative min-h-55 sm:h-60 transition-transform duration-500 transform-style-preserve-3d ${
                        flipped ? "transform-[rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* FRONT */}
                      <div
                        className="
                          absolute inset-0
                          bg-white
                          rounded-3xl
                          border border-slate-200
                          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                          p-4 sm:p-6
                          flex flex-col justify-between
                          backface-hidden
                          overflow-hidden
    ">
      <div className="text-[11px] tracking-widest uppercase text-slate-500">
                          Question
                        </div>

                        <p className="text-center text-slate-800 font-medium text-base sm:text-lg leading-snug">
                          {deck.content[current].question}
                        </p>

                        <div className="text-center text-xs text-red-400">
                          Tap to reveal answer
                        </div>
                      </div>

                      {/* BACK */}
                      <div
                        className="
                          absolute inset-0
                          rounded-3xl
                          p-4 sm:p-5
                          bg-linear-to-br from-emerald-500 to-teal-500
                          shadow-[0_20px_60px_rgba(16,185,129,0.35)]
                          flex flex-col justify-between
                          backface-hidden
                          transform-[rotateY(180deg)]
                        "
                      >
                        <div className="text-[10px] sm:text-[11px] tracking-widest uppercase text-emerald-100">
                          Answer
                        </div>

                        <p className="text-center text-white text-sm sm:text-base leading-relaxed">
                          {deck.content[current].answer}
                        </p>

                        <div className="text-center text-xs text-red-400">
                          Tap to go back
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* CONTROLS */}
                  <div className="mt-4 flex items-center justify-between px-2">
                    <button
                      onClick={() => prev(deck._id)}
                      disabled={current === 0}
                      className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <span className="text-sm text-slate-500 font-medium">
                      {current + 1} / {deck.content.length}
                    </span>

                    <button
                      onClick={() => next(deck._id, deck.content.length)}
                      disabled={current === deck.content.length - 1}
                      className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
      </div>

    </>
  ) : (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Brain className="h-10 w-10 text-emerald-600 mb-4" />
      <p className="mb-4">No Flashcards Yet</p>
      <button
        onClick={generateFlashcard}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
      >
        Generate Flashcard
      </button>
    </div>
  )}

  <style jsx global>{`
    .perspective {
      perspective: 1000px;
    }
    .transform-style-preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
  `}</style>
</div>
  );
};

export default FlashCard;
