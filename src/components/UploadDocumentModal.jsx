// src/components/UploadDocumentModal.jsx
import { useContext, useState } from "react";
import { PdfContext } from "../context/Pdfcontext";

export default function UploadDocumentModal({ open, onClose }) {
  const [file, setFile] = useState(null);
  const { UploadPdf, loading } = useContext(PdfContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    await UploadPdf(form);

    setFile(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl md:p-8">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Upload New Document
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Add a PDF document to your library
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PDF upload */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              PDF FILE
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-8 text-center hover:border-emerald-400">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
                ⬆
              </div>

              <p className="text-sm font-medium text-emerald-700">
                {file ? file.name : "Upload file"}
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                PDF up to 10MB
              </p>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border px-5 py-2.5 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!file || loading}
              className={`
    rounded-2xl px-6 py-2.5 text-sm text-white
    bg-emerald-500 hover:bg-emerald-600
    disabled:bg-emerald-300 disabled:cursor-not-allowed
    transition
  `}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
