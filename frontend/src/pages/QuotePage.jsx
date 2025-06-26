import React, { useEffect, useState } from "react";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_URL = "http://localhost:5000/api/quotes";
const VEHICLE_API_URL = "http://localhost:5000/api/vehicles";
const USER_API_URL = "http://localhost:5000/api/users";

const emptyQuote = {
  vehicle_id: "",
  insurance_company: "",
  price: "",
  coverage: "",
};

const QuotePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyQuote);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQuotes(data);
      // Alert.fireToast({ type: "success", message: "Teklifler başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Teklifler alınamadı" });
    }
    setLoading(false);
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch(VEHICLE_API_URL);
      const data = await res.json();
      setVehicles(data);
      // Alert.fireToast({ type: "success", message: "Araçlar başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Araçlar alınamadı" });
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(USER_API_URL);
      const data = await res.json();
      setUsers(data);
      // Alert.fireToast({ type: "success", message: "Kullanıcılar başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Kullanıcılar alınamadı" });
    }
  };

  useEffect(() => {
    fetchQuotes();
    fetchVehicles();
    fetchUsers();
  }, []);

  const sortedQuotes = [...quotes].sort((a, b) => b.quote_id - a.quote_id);

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
      setForm(emptyQuote);
      setEditingId(null);
      fetchQuotes();
      Alert.fireToast({ type: "success", message: editingId ? "Teklif güncellendi!" : "Teklif eklendi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  const handleEdit = (quote) => {
    setForm({
      vehicle_id: quote.vehicle_id,
      insurance_company: quote.insurance_company,
      price: quote.price,
      coverage: quote.coverage,
    });
    setEditingId(quote.quote_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchQuotes();
      Alert.fireToast({ type: "success", message: "Teklif silindi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 mx-auto">
        {/* <h1 className="text-2xl font-bold mb-4">Teklif Yönetimi</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="vehicle_id"
              value={form.vehicle_id}
              onChange={handleChange}
              placeholder="Araç ID"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="insurance_company"
              value={form.insurance_company}
              onChange={handleChange}
              placeholder="Sigorta Şirketi"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Fiyat"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="coverage"
              value={form.coverage}
              onChange={handleChange}
              placeholder="Kapsam"
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
              onClick={() => { setForm(emptyQuote); setEditingId(null); }}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </form> */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">Teklifler</h2>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 font-bold text-center align-middle">ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Araç ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Marka/Model</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Kullanıcı TC</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Sigorta Şirketi</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Fiyat</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Kapsam</th>
                  {/* <th className="px-4 py-2 font-bold text-center align-middle">İşlemler</th> */}
                </tr>
              </thead>
              <tbody>
                {sortedQuotes.map((q) => {
                  const vehicle = vehicles.find(v => v.vehicle_id === q.vehicle_id);
                  const user = vehicle ? users.find(u => u.user_id === vehicle.user_id) : null;
                  return (
                    <tr key={q.quote_id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition">
                      <td className="px-4 py-2 text-center align-middle">{q.quote_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{q.vehicle_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{vehicle ? vehicle.brand_model : "-"}</td>
                      <td className="px-4 py-2 text-center align-middle">{user ? user.tc_identity_number : "-"}</td>
                      <td className="px-4 py-2 text-center align-middle">{q.insurance_company}</td>
                      <td className="px-4 py-2 text-center align-middle">{q.price}</td>
                      <td className="px-4 py-2 text-center align-middle">{q.coverage}</td>
                      {/* <td className="px-4 py-2 text-center align-middle flex justify-center"> */}
                        {/* <button
                          className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                          onClick={() => handleEdit(q)}
                          disabled={loading}
                        >Düzenle</button> */}
                        {/* <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDelete(q.quote_id)}
                          disabled={loading}
                        >Sil</button> */}
                      {/* </td> */}
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

export default QuotePage; 