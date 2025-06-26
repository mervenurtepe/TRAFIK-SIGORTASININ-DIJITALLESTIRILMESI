import React, { useState, useEffect } from "react";
import App from "../../App";

const DUMMY_TOKEN_KEY = "jwtToken";
const DUMMY_TOKEN_VALUE = "example-jwt-token";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Eğer token varsa kullanıcı login sayılır
    const token = localStorage.getItem(DUMMY_TOKEN_KEY);
    if (token === DUMMY_TOKEN_VALUE) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Basit kontrol (örnek: email ve şifre boş olmasın)
    if (!email || !password) {
      setError("Lütfen e-posta ve şifre giriniz.");
      return;
    }
    // Dummy login: token kaydet ve login ol
    localStorage.setItem(DUMMY_TOKEN_KEY, DUMMY_TOKEN_VALUE);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <App />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sigortam</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şifre</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
