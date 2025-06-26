import React, { useEffect, useState } from "react";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_URL = "http://localhost:5000/api/policies";

const emptyPolicy = {
  payment_id: "",
  pdf_path: "",
  start_date: "",
  end_date: "",
};

const PolicePage = () => {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState(emptyPolicy);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all policies
  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPolicies(data);
      // Alert.fireToast({ type: "success", message: "Poliçeler başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Poliçeler alınamadı" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update policy
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
      setForm(emptyPolicy);
      setEditingId(null);
      fetchPolicies();
      Alert.fireToast({ type: "success", message: editingId ? "Poliçe güncellendi!" : "Poliçe eklendi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  // Edit policy
  const handleEdit = (policy) => {
    setForm({
      payment_id: policy.payment_id,
      pdf_path: policy.pdf_path,
      start_date: policy.start_date?.slice(0, 10),
      end_date: policy.end_date?.slice(0, 10),
    });
    setEditingId(policy.policy_id);
  };

  // Delete policy
  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchPolicies();
      Alert.fireToast({ type: "success", message: "Poliçe silindi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  // Poliçeleri policy_id'ye göre büyükten küçüğe sırala
  const sortedPolicies = [...policies].sort((a, b) => b.policy_id - a.policy_id);

  // PDF indirme fonksiyonu
  const handleDownload = async (policy_id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/policies/${policy_id}/download`);
      if (!res.ok) throw new Error("PDF indirilemedi");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `police_${policy_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      Alert.fireToast({ type: "success", message: "PDF başarıyla indirildi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "PDF indirilemedi: " + err.message });
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 mx-auto">
        {/* <h1 className="text-2xl font-bold mb-4">Poliçe Yönetimi</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="payment_id"
              value={form.payment_id}
              onChange={handleChange}
              placeholder="Ödeme ID"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="pdf_path"
              value={form.pdf_path}
              onChange={handleChange}
              placeholder="PDF Yolu"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              type="date"
              placeholder="Başlangıç Tarihi"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              type="date"
              placeholder="Bitiş Tarihi"
              className="border rounded px-3 py-2"
              required
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
              onClick={() => { setForm(emptyPolicy); setEditingId(null); }}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </form> */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">Poliçeler</h2>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 font-bold text-center align-middle">ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Ödeme ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Plaka</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Marka/Model</th>
                  {/* <th className="px-4 py-2 font-bold text-center align-middle">PDF Yolu</th> */}
                  <th className="px-4 py-2 font-bold text-center align-middle">Başlangıç</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Bitiş</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedPolicies.map((p) => {
                  const vehicle = p.Payment?.Quote?.Vehicle;
                  return (
                    <tr key={p.policy_id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition">
                      <td className="px-4 py-2 text-center align-middle">{p.policy_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.payment_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{vehicle?.plate_number || "-"}</td>
                      <td className="px-4 py-2 text-center align-middle">{vehicle?.brand_model || "-"}</td>
                      {/* <td className="px-4 py-2 text-center align-middle">{p.pdf_path}</td> */}
                      <td className="px-4 py-2 text-center align-middle">{p.start_date?.slice(0,10)}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.end_date?.slice(0,10)}</td>
                      <td className="px-4 py-2 text-center align-middle flex justify-center gap-2">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          onClick={() => handleDownload(p.policy_id)}
                        >PDF İndir</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default PolicePage;
