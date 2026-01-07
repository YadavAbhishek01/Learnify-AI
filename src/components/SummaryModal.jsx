import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function SummaryModal({ summary, explanation, modalType, onClose }) {
  if (!summary && !explanation) return null;

  const content =
    (modalType === "summary" ? summary : explanation)?.replace(/\u00A0/g, " ");

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4">
            {modalType === "summary"
              ? "📘 Document Summary"
              : "🧠 Concept Explanation"}
          </h2>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto text-sm text-gray-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-lg font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-base font-semibold mt-4 mb-2" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-sm font-semibold mt-3 mb-1" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="mb-2 whitespace-pre-wrap leading-relaxed" {...props} />
                ),
                li: ({ ...props }) => (
                  <li className="ml-5 list-disc mb-1" {...props} />
                ),
                code: ({ inline, children, ...props }) =>
                  inline ? (
                    <code className="bg-emerald-100 px-1 rounded" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-emerald-50 p-3 rounded overflow-x-auto mb-3">
                      <code>{children}</code>
                    </pre>
                  ),
                table: ({ ...props }) => (
                  <table className="border border-gray-300 w-full my-3 text-left" {...props} />
                ),
                th: ({ ...props }) => (
                  <th className="border border-gray-300 bg-gray-100 px-2 py-1" {...props} />
                ),
                td: ({ ...props }) => (
                  <td className="border border-gray-300 px-2 py-1" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
