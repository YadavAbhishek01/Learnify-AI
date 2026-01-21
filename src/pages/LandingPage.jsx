import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-bold">⚡</span>
            </div>
            <h1 className="text-xl font-bold text-emerald-600">
              Learnify-AI
            </h1>
          </div>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Learn smarter from your{" "}
            <span className="text-emerald-600">PDFs</span>
          </h2>

          <p className="text-slate-600 text-lg mb-8">
            Upload any PDF and instantly chat with it.  
            Get AI-powered summaries, flashcards, quizzes, and
            accurate answers — all grounded in your document.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/documents"
              className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition text-center"
            >
              Upload PDF
            </Link>

                      <Link to="/register" className="px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100">
                          Create Account
                      </Link>

          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white border rounded-3xl shadow-md p-8">
          <div className="space-y-4">
            <Step text="📄 Upload your PDF" />
            <Step text="🧠 AI understands your document" />
            <Step text="💬 Ask questions & get answers" />
            <Step text="🗂 Get summaries, flashcards & quizzes" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Everything you need to master your PDFs
          </h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="PDF Chat"
              desc="Ask questions and get answers strictly based on your PDF content."
              icon="💬"
            />
            <Feature
              title="Smart Summaries"
              desc="Turn long documents into clear, concise summaries."
              icon="🧠"
            />
            <Feature
              title="Flashcards"
              desc="Automatically generated flashcards for quick revision."
              icon="🗂"
            />
            <Feature
              title="AI Quizzes"
              desc="Test your understanding with auto-generated quizzes."
              icon="📝"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-4">
        <h3 className="text-3xl font-bold mb-4">
          Ready to learn faster?
        </h3>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          Upload your PDF and let AI help you understand it better.
        </p>

        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Start Learning
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Learnify-AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const Step = ({ text }) => (
  <div className="p-4 border rounded-xl bg-slate-50 hover:bg-slate-100 transition">
    {text}
  </div>
);

const Feature = ({ title, desc, icon }) => (
  <div className="border rounded-2xl p-6 bg-slate-50 hover:shadow-md transition">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-slate-600 text-sm">{desc}</p>
  </div>
);

export default LandingPage;
