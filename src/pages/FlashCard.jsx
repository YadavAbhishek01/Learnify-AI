import { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PdfContext } from "../context/Pdfcontext";
import { Link, useNavigate } from "react-router-dom";

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


  if (loading)
    return(
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white border rounded-3xl shadow-sm p-8 text-center">

          <div className="h-12 w-12 mx-auto mb-4 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600"></div>

          <h2 className="text-lg font-semibold mb-1">
            Loading Flashcards
          </h2>

          <p className="text-slate-600 text-sm">
            Preparing smart flashcards from your document...
          </p>
        </div>
      </div>
    )
  if (!allcard.length) 
return(
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white  rounded-3xl p-8 max-w-md text-center">
        
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
)
    
   


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
