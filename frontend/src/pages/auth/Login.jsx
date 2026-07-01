import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { saveToken } from "../../utils/storage";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await login(form.email, form.password);

        // Simpan token
        saveToken(res.token);

        // Simpan data user
        localStorage.setItem(
        "user",
        JSON.stringify(res.user)
        );

        toast.success("Login berhasil");

        navigate("/dashboard");
    } catch (err) {
        toast.error(
            err.response?.data?.message ||
            "Login gagal"
          );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 w-full rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 w-full rounded mb-6"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;