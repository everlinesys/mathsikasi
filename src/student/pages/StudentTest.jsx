import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../shared/api";
import { getUser } from "../../shared/auth";

export default function StudentTest() {
  const { courseId } = useParams();
  const user = getUser();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  // ---------------- LOAD TEST ----------------
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/final-tests/${courseId}`);
        setQuestions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [courseId]);

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (submitted) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  // ---------------- SELECT ANSWER ----------------
  function selectAnswer(qId, option) {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  }

  // ---------------- SUBMIT ----------------
  async function handleSubmit() {
    if (submitted) return;

    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    const percent = Math.round((score / questions.length) * 100);

    try {
      const res = await api.post("/final-tests/submit", {
        userId: user.id,
        courseId,
        score: percent,
      });

      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  }

  function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  // ---------------- UI ----------------
  if (loading) return <div className="p-10">Loading test...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-xl font-bold">Final Test</h1>

      {/* TIMER */}
      {!submitted && (
        <div className="text-sm text-red-600 font-semibold">
          ⏳ Time Left: {formatTime(timeLeft)}
        </div>
      )}

      {/* QUESTIONS */}
      {!submitted &&
        questions.map((q, i) => {
          const opts = JSON.parse(q.options || "[]");

          return (
            <div key={q.id} className="border p-4 rounded space-y-3">
              <p className="font-medium">
                {i + 1}. {q.question}
              </p>

              {opts.map((opt, idx) => (
                <label
                  key={idx}
                  className={`block border px-3 py-2 rounded cursor-pointer ${
                    answers[q.id] === opt
                      ? "bg-indigo-100 border-indigo-500"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    className="mr-2"
                    checked={answers[q.id] === opt}
                    onChange={() => selectAnswer(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          );
        })}

      {/* SUBMIT BUTTON */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
        >
          Submit Test
        </button>
      )}

      {/* RESULT */}
      {submitted && result && (
        <div className="border p-6 rounded-xl text-center space-y-4">

          <h2 className="text-lg font-bold">
            {result.passed ? "🎉 Passed!" : "❌ Failed"}
          </h2>

          <p className="text-sm">
            Score: {result.score}%
          </p>

          {result.passed && (
            <p className="text-green-600 font-medium">
              Certificate unlocked 🎓
            </p>
          )}

          {!result.passed && (
            <p className="text-red-500 text-sm">
              You need 60% to pass
            </p>
          )}
        </div>
      )}
    </div>
  );
}