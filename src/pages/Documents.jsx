import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import UploadDocumentModal from "../components/UploadDocumentModal";
import { PdfContext } from "../context/Pdfcontext";
import { Authcontext } from "../context/Authcontext";

export default function Documents() {
  const [open, setOpen] = useState(false);
  const { pdfdata, getPdfById, DeletePdf, loading } = useContext(PdfContext);
  const { authUser } = useContext(Authcontext)
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const confirmDelete = (id) => {
    setSelectedId(id);

    confirmDialog({
      group: "deleteDialog",
      header: "Delete Document",
      message: "This action cannot be undone. Are you sure?"
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 md:px-10">

{loading && (
  <div className="flex justify-center py-20">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500"></div>
  </div>
)}
      {/* ✅ CONFIRM DIALOG (MOUNT ONCE) */}
      <div>
        <ConfirmDialog
          group="deleteDialog"
          content={({ hide, message }) => (
            <div className="w-88 rounded-2xl bg-white p-6 shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <Trash size={28} className="text-red-500" />
              </div>

              <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">
                {message.header}
              </h3>

              <p className="mb-6 text-center text-sm text-gray-500">
                {message.message}
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={hide}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={async () => {
                    await DeletePdf(selectedId);
                    getPdfById();
                    hide();
                  }}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 transition disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          )}
        />

      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Documents</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and organize your learning materials</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm text-white shadow-lg"
        >
          + Upload Document
        </button>
      </div>

      <UploadDocumentModal open={open} onClose={() => setOpen(false)} />
      {/* EMPTY STATE MESSAGE */}
      {pdfdata.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white px-10 py-8 shadow-sm text-center">
            <span className="mb-3 text-4xl">📄</span>

            <p className="text-sm font-semibold text-gray-700">
              No documents found
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Upload a document to get started
            </p>

            <button
              onClick={() => setOpen(true)}
              className="mt-4 rounded-full bg-emerald-500 px-5 py-2 text-xs text-white hover:bg-emerald-600 transition"
            >
              Upload Document
            </button>
          </div>
        </div>
      )}

      {/* Documents Grid */}

      {pdfdata.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pdfdata.map((doc) => (
            <article
              key={doc._id}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
                📄
              </div>

              <h2
                onClick={() => navigate(`/documents/${doc._id}`)}
                className="mb-1 cursor-pointer line-clamp-2 text-lg font-semibold text-gray-900"
              >
                {doc.originalName}
              </h2>

              <p className="mb-4 text-xs text-gray-400">{doc.size}</p>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="rounded-full bg-fuchsia-50 px-3 py-1 text-xs text-fuchsia-600">
                    📚 flashcards {doc.flashcards}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-600">
                    🧪 quizzes {doc.quizzes}
                  </span>
                </div>

                <button
                  onClick={() => confirmDelete(doc._id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-50"
                >
                  <Trash size={16} className="text-red-500" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
