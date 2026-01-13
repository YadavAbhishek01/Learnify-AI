import { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { PdfContext } from "../context/Pdfcontext";
import { Dna } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DocumentChat({ pdfId }) {
  const { getAiResponse, getChatHistory } = useContext(PdfContext);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 🔹 Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🔹 LOAD OLD CHAT
  useEffect(() => {
    const loadChat = async () => {
      try {
        const oldMessages = await getChatHistory(pdfId);
        setMessages(oldMessages);
      } catch (err) {
        toast.error("Failed to load chat history");
      }
    };
    loadChat();
  }, [pdfId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const question = inputValue;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInputValue("");
    setLoading(true);

    try {
      const ai = await getAiResponse({ pdfId, question });
      setMessages((prev) => [...prev, { role: "ai", content: ai.answer }]);
    } catch (err) {
      toast.error("Failed to get AI response");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen flex-col rounded-2xl bg-white shadow-sm">
      {/* Messages container */}
      <div className="flex flex-col space-y-3 p-2 md:p-4 overflow-y-auto flex-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`relative max-w-[90%] md:max-w-[75%] rounded-2xl px-3 md:px-4 py-3 text-sm wrap-break-word
                ${msg.role === "ai"
                  ? "bg-emerald-50 text-emerald-900 shadow-md"
                  : "bg-emerald-600 text-white shadow-md"
                }`}
            >
              {msg.role === "ai" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="whitespace-pre-wrap mb-1" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }) =>
                      inline ? (
                        <code className="bg-emerald-200 px-1 rounded-lg shadow-2xl" {...props}>
                          {children}
                        </code>
                      ) : (
                        <pre className="bg-emerald-100 p-3 rounded-lg shadow-xl overflow-x-auto" {...props}>
                          <code>{children}</code>
                        </pre>
                      ),
                    li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
                    table: ({ node, ...props }) => (
                      <table className="border border-emerald-300 w-full text-left mb-2" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="border border-emerald-300 px-2 py-1 bg-emerald-200" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="border border-emerald-300 px-2 py-1" {...props} />
                    ),
                  }}
                >
                  {msg.content.replace(/\u00A0/g, " ")}
                </ReactMarkdown>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content.replace(/\u00A0/g, " ")}</p>
              )}



              {/* Optional timestamp */}
              {msg.timestamp && (
                <span
                  className={`absolute bottom-1 right-2 text-[10px] ${
                    msg.role === "ai" ? "text-emerald-700" : "text-green-200"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* AI typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[50%] md:max-w-[30%] rounded-2xl bg-emerald-100 px-3 md:px-4 py-2 text-sm text-emerald-700 shadow-md flex items-center gap-2 animate-pulse">
              <Dna className="w-4 h-4 md:w-5 md:h-5 animate-spin-slow" />
              <span>typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} /> {/* scroll anchor */}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t px-2 md:px-4 py-2 md:py-3 flex gap-2 md:gap-3">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 rounded-2xl border px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          placeholder="Ask about this document..."
        />
        <button
          disabled={inputValue==="" || loading}
          className="bg-emerald-500 text-white px-2 md:px-4 py-2 rounded-xl disabled:opacity-50 cursor-no-drop"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
