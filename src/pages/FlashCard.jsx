import { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PdfContext } from "../context/Pdfcontext";
import { useNavigate } from "react-router-dom";

const FlashCard = () => {
  const { allcard, GetFlashcardsByPdfId, loading } = useContext(PdfContext);
  const [uiState, setUiState] = useState({});
  const [pdfId, setPdfId] = useState(null);

  const navigate=useNavigate();
  // Get pdfId from localStorage once
  useEffect(() => {
    const storedPdfId = JSON.parse(localStorage.getItem("pdfId"));
    setPdfId(storedPdfId);
  }, []);

  // Fetch flashcards when pdfId is ready
  useEffect(() => {
    if (pdfId) {
      GetFlashcardsByPdfId(pdfId);
    }
  }, [pdfId]);

//   const toggleFlip = (id) => {
//     setUiState((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], flipped: !prev[id]?.flipped },
//     }));
//   };

//   const next = (id, length) => {
//     setUiState((prev) => ({
//       ...prev,
//       [id]: { current: Math.min((prev[id]?.current || 0) + 1, length - 1), flipped: false },
//     }));
//   };

//   const prev = (id) => {
//     setUiState((prev) => ({
//       ...prev,
//       [id]: { current: Math.max((prev[id]?.current || 0) - 1, 0), flipped: false },
//     }));
//   };

  if (loading) return <div className="text-center py-20">Loading flashcards...</div>;
  if (!allcard.length) return <div className="text-center py-20">No flashcards available</div>;

  return (
    <div className="p-6 bg-emerald-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" >
        {allcard.map((deck) => {
          const current = uiState[deck._id]?.current || 0;
        //   const flipped = uiState[deck._id]?.flipped || false;

          // Safely extract text (prevent "Objects are not valid" error)
          const questionText = typeof deck.content[current]?.question === "string"
            ? deck.content[current].question
            : JSON.stringify(deck.content[current]?.question);

          const answerText = typeof deck.content[current]?.answer === "string"
            ? deck.content[current].answer
            : JSON.stringify(deck.content[current]?.answer);

          return (
            <div key={deck._id} className="group" onClick={()=>navigate(`/flashcard/${deck._id}`)}>
              {/* Flashcard */}
              <div
                className="perspective-distant cursor-pointer"
               
              >
                <div
                  className={`relative h-60 transition-transform duration-500 [transform-style:preserve-3d]]`}
                >
                  {/* FRONT */}
                  <div className="absolute inset-0 bg-white rounded-3xl border border-slate-200 shadow p-6 flex flex-col justify-between backface-hidden overflow-hidden">
                    <div className="text-[11px] tracking-widest uppercase text-slate-500  relative">
                       Question
                    </div>
                              <div className="text-center text-xs text-green-400">
                                  Tap to View
                              </div>
                         <p className="text-center text-slate-800 font-medium text-lg leading-snug absolute top-[45%]">{questionText}</p>
                    
                   
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 bg-slate-50 rounded-3xl border border-slate-200 shadow p-6 flex flex-col justify-between backface-hidden transform-[rotateY(180deg)] overflow-hidden">
                    <div className="text-[11px] tracking-widest uppercase text-slate-500">Answer</div>
                
                    <p className="text-center text-slate-700 text-base leading-relaxed absolute top-[36%]">{answerText}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-4 flex items-center justify-between px-2">
                <button
                  onClick={() => prev(deck._id)}
                  disabled={current === 0}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-slate-500 font-medium">{current + 1} / {deck.content.length}</span>
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
    </div>
  );
};

export default FlashCard;
