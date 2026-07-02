import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch {
      // Error is handled by the auth hook.
    }
  };

  return (
    <div className="auth-screen">
      <section className="auth-context">
        <div>
          <span className="brand-mark mb-6">LS</span>
          <p className="page-kicker">Sistem pengaduan sekolah</p>
          <h1 className="page-title">
            LaporSekolah
          </h1>
          <p className="auth-context-text">
            Kanal resmi untuk mencatat laporan siswa, memantau tindak lanjut, dan menjaga percakapan tetap rapi.
          </p>
        </div>
        <div className="auth-proof">
          <div className="auth-proof-item">Laporan masuk tercatat dengan status yang jelas.</div>
          <div className="auth-proof-item">Guru dan admin dapat memprioritaskan tindak lanjut.</div>
          <div className="auth-proof-item">Siswa dapat melihat perkembangan tanpa bertanya ulang.</div>
        </div>
      </section>

      <div className="auth-form-wrap">
        <form onSubmit={handleSubmit} className="auth-card panel p-8">
          <h1 className="section-title mb-2">Masuk</h1>
          <p className="page-subtitle mb-6">Masukkan email dan password akun.</p>

          {error && <p className="alert alert-error mb-4">{error}</p>}

          <div className="mb-4">
            <label className="field-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="field"
            />
          </div>

          <div className="mb-6">
            <label className="field-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="field"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Memproses..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4 text-[color:var(--color-ink-2)]">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-[color:var(--color-accent)]">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
