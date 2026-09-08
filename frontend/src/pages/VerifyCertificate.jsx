import { useState } from "react";
import api from "../services/api";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await api.get(`/certificates/verify/${certificateId}`);
      setResult(res.data);
    } catch (error) {
      setResult(
        error.response?.data || {
          valid: false,
          mesasge: "Something went wrong",
        },
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center">Verify Certificate</h1>

        <p className="text-slate-400 text-center mt-2">
          {" "}
          Enter your certificate ID to verify its authenticity.
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>

          {result && (
            <div className="mt-6">
              {result.valid ? (
                <div className="bg-green-500/10 border border-green-500 rounded-xl p-5">
                  <h2 className="text-xl font-bold text-green-400">
                    ✓ Certificate Verified
                  </h2>
                  <p className="text-slate-300 mt-4">
                    <span className="text-slate-400">Student Name:</span>
                    {result.certificate.student?.name}
                  </p>

                  <p className="text-slate-300 mt-2">
                    <span className="text-slate-400">Course: </span>
                    {result.certificate.course?.title}
                  </p>

                  <p className="text-slate-300 mt-2">
                    <span className="text-slate-400">Issue Date: </span>
                    {new Date(result.certificate.issuedAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500 rounded-xl p-5">
                  <h2 className="text-xl font-bold text-red-400">
                    ✗ Certificate Not Valid
                  </h2>

                  <p className="text-slate-400 mt-2">{result.message}</p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default VerifyCertificate;
