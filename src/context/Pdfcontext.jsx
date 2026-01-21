import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AskaiInstanse, PdfUpload, ProgreesInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { Authcontext } from "./Authcontext";

export const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const {authUser}=useContext(Authcontext)
  const [pdfdata, setPdfData] = useState([]);
  const [summary,SetSummary]=useState('')
  const [flashcarddata,SetFlashCardData]=useState([])
  const [allcard,SetAllCard]=useState([])
const [explanation, setExplanation] = useState("");
const [summaryLoading, setSummaryLoading] = useState(false);
const [explainLoading, setExplainLoading] = useState(false);
const [Quiz, SetQuiz] = useState([]);
const [progress, SetProgress] = useState(null);
  const [response,setResponse]=useState([{
    question:'',
    answer:''
  }])
  const [loading,SetLoading]=useState(false)

useEffect(() => {
  if (!token) return;

  PdfUpload.defaults.headers.common.Authorization = `Bearer ${token}`;
  AskaiInstanse.defaults.headers.common.Authorization = `Bearer ${token}`;
  ProgreesInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

  getPdfById(); 
}, [token]);



  const UploadPdf = async (body) => {
    try {
      SetLoading(true)
      const res = await PdfUpload.post("/upload", body);
      if (res.data.success) 
        {
        toast.success("PDF Uploaded Successfully");
        getPdfById()
        }
        else
        {
          SetLoading(false)
          toast.error("failed to Uplaod PDf")
        }
    } catch (error) {
      SetLoading(false)
      console.error(error);
    }
  };

  // ✅ MEMOIZED FUNCTION
  const getPdfById = async () => {
    try {
      SetLoading(true)
      const res = await PdfUpload.get("/my-pdfs");
      if (res.data.success) {
        setPdfData(res.data.pdfs);
      }
    } catch (error) {
      SetLoading(false)
      console.error(error);
    }finally{
      SetLoading(false)
    }
  }

  const getAiResponse=async({pdfId,question})=>{
    try {
        SetLoading(true)
    const res=await AskaiInstanse.post(`/ask/${pdfId}`,{question});
    if(res.data.success)
    {
     
     return {
        question: res.data.question,
        answer: res.data.answer,
      };

    }
    } catch (error) {
      SetLoading(false)
      toast.error("failed to get Reasponse")
      throw error;
    }finally{
      SetLoading(false)
    }
  }
  const DeletePdf=async(pdfId)=>{
    try {
      SetLoading(true)
        const res=await PdfUpload.delete(`/delete/${pdfId}`);
      if(res.data.success)
      {
        toast.success("Deleted Successfully")
        SetLoading(false)
      }
      else{
        toast.error("failed to delete the document")
        SetLoading(false)
      }
    } catch (error) {
      SetLoading(false)
      console.log(error || error.message)
    }finally{
      SetLoading(false)
    }
    
  }
  const getChatHistory = async (pdfId) => {
  const res = await AskaiInstanse.get(`/chat/${pdfId}`);
  return res.data.messages;
};
 const GenerateSummary = async (pdfId) => {
  try {
    setSummaryLoading(true);

    const res = await PdfUpload.get(`/summary/${pdfId}`);

    if (res.data.success) {
      SetSummary(res.data.summary);
    
    } else {
      setSummaryLoading(false);
      toast.error("Failed to generate summary");
    }

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while generating summary");
  } finally {
    setSummaryLoading(false);
  }
};
const ExplainConcept=async(pdfId,concept)=>{
try {
  setExplainLoading(true)
    const res=await PdfUpload.get(`explain/${pdfId}?concept=${encodeURIComponent(concept)}`);
  if(res.data.success)
  {
    setExplanation(res.data.explanation);
  }
  else
  {
    toast.error("failed to exaplain")

  }
} catch (error) {
  console.log(error);
 toast.error("Something went wrong");
}
finally{
  setExplainLoading(false)
}
}
const GenerateFlashCardByPdfId=async(pdfId)=>{
    try {
      SetLoading(true)
      await GetFlashcardsByPdfId(pdfId);
      const res=await PdfUpload.get(`/flashcards/${pdfId}`);
      if(res.data.success)
      {
        SetFlashCardData(res.data.flashcard);
        toast.success("FlashCard Generated!")
      }
      else{
        SetLoading(false)
        toast.error("falied to Create FlashCards")
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }finally{
      SetLoading(false)
    }
}
const GetFlashcardsByPdfId=async(pdfId)=>{
  try {
    SetLoading(true);
    const res=await PdfUpload.get(`/get-flashcards/${pdfId}`);
    if(res.data.success)
    {
      
      SetAllCard(res.data.flashcard);
    }
    else{
      SetLoading(false)
      toast.error("Failed to fetch Flashcards")
    }
  } catch (error) {
    SetLoading(false)
    toast.error(error);
  }finally{
    SetLoading(false);
  }
}
const DeleteFlashcard=async(flashCardId)=>{
    try {
        SetLoading(true)
         const res=await pdfdata.delete(`/flashcard/${flashCardId}`);
        if(res.data.success)
        {
          toast.success("Deleted Successfullu")
        }
        else{
            toast.error("Failed to Deleted",res.data.message);
            SetLoading(false)
        }
    } catch (error) {
      console.log("something went Wrong",error);
      toast.error(error);
    }finally{
      SetLoading(false)
    }
}
const GenerateQuiz=async(pdfId)=>{
  try {
    SetLoading(true)
    const res=await PdfUpload.get(`/quiz/${pdfId}`);
    if(res.data.success)
    {
      SetQuiz(res.data.data);
    }
    else{
      toast.error("Failed to Generate Quize");
      SetLoading(false)
    }
  } catch (error) {
    console.log(error || error.message);
    toast.error(error);
  }finally{
    SetLoading(false);
  }
}

const SubmitQuiz=async(pdfId,score)=>{
  try {
    SetLoading(true);
    const res=await ProgreesInstance.post(`/quiz/${pdfId}`,{score});

    if(res.data.success)
    {
        toast.success("Quiz Submited!");
        SetProgress(res.data.data)
    }
    else{
      toast.error("Failed to Submit Quiz");
      SetLoading(false)
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error);
    SetLoading(false)
  }finally{
    SetLoading(false)
  }
}
  return (
    <PdfContext.Provider value={{ UploadPdf, getPdfById, pdfdata,getAiResponse,response ,getChatHistory,loading,DeletePdf,GenerateSummary,summary,ExplainConcept,explanation,explainLoading,summaryLoading,GenerateFlashCardByPdfId,flashcarddata,allcard,GetFlashcardsByPdfId,Quiz,progress,SetProgress,GenerateQuiz,DeleteFlashcard,SubmitQuiz}}>
      {children}
    </PdfContext.Provider>
  );
};

