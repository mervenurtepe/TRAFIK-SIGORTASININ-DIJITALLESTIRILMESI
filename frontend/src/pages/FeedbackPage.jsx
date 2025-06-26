import React, { useEffect, useState } from "react";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_URL = "http://localhost:5000/api/feedbacks";

const emptyFeedback = {
  user_id: "",
  rating: "",
  comment: "",
};

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState(emptyFeedback);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setFeedbacks(data);
      // Alert.fireToast({ type: "success", message: "Geri bildirimler başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Geri bildirimler alınamadı" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => b.feedback_id - a.feedback_id);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("İşlem başarısız");
      setForm(emptyFeedback);
      setEditingId(null);
      fetchFeedbacks();
      Alert.fireToast({ type: "success", message: editingId ? "Geri bildirim güncellendi!" : "Geri bildirim eklendi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  const handleEdit = (feedback) => {
    setForm({
      user_id: feedback.user_id,
      rating: feedback.rating,
      comment: feedback.comment,
    });
    setEditingId(feedback.feedback_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchFeedbacks();
      Alert.fireToast({ type: "success", message: "Geri bildirim silindi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 mx-auto">
        {/* <h1 className="text-2xl font-bold mb-4">Geri Bildirim Yönetimi</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              placeholder="Kullanıcı ID"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="Puan (1-5)"
              className="border rounded px-3 py-2"
              required
              type="number"
              min="1"
              max="5"
            />
            <input
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Yorum"
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {editingId ? "Güncelle" : "Ekle"}
          </button>
          {editingId && (
            <button
              type="button"
              className="mt-4 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              onClick={() => { setForm(emptyFeedback); setEditingId(null); }}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </form> */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">Geri Bildirimler</h2>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 font-bold text-center align-middle">ID</th>
                  {/* <th className="px-4 py-2 font-bold text-center align-middle">Kullanıcı ID</th> */}
                  <th className="px-4 py-2 font-bold text-center align-middle">Puan</th>
                  <th className="px-4 pl-10 py-2 font-bold text-left align-left">Yorum</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedFeedbacks.map((f) => (
                  <tr key={f.feedback_id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition">
                    <td className="px-4 py-2 text-center align-middle">{f.feedback_id}</td>
                    {/* <td className="px-4 py-2 text-center align-middle">{f.user_id}</td> */}
                    <td className="px-4 py-2 text-center align-middle">{f.rating}</td>
                    <td className="px-4 pl-10 py-2 text-left align-left">{f.comment}</td>
                    <td className="px-4 py-2 text-center align-middle flex justify-center">
                      {/* <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                        onClick={() => handleEdit(f)}
                        disabled={loading}
                      >Düzenle</button> */}
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(f.feedback_id)}
                        disabled={loading}
                      >Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default FeedbackPage; 