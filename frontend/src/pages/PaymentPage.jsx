import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_URL = "http://localhost:5000/api/payments";

const emptyPayment = {
  user_id: "",
  quote_id: "",
  amount: "",
  payment_method: "",
  installment_option: "",
  payment_status: "",
};

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState(emptyPayment);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPayments(data);
      // Alert.fireToast({ type: "success", message: "Ödemeler başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Ödemeler alınamadı" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const sortedPayments = [...payments].sort((a, b) => b.payment_id - a.payment_id);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const method = "PUT";
      const url = `${API_URL}/${editingId}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("İşlem başarısız");
      setForm(emptyPayment);
      setEditingId(null);
      fetchPayments();
      Alert.fireToast({ type: "success", message: "Ödeme güncellendi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  const handleEdit = (payment) => {
    setForm({
      user_id: payment.user_id,
      quote_id: payment.quote_id,
      amount: payment.amount,
      payment_method: payment.payment_method,
      installment_option: payment.installment_option,
      payment_status: payment.payment_status,
    });
    setEditingId(payment.payment_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchPayments();
      Alert.fireToast({ type: "success", message: "Ödeme silindi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  const handlePaid = async (payment) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${payment.payment_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payment, payment_status: "Başarılı" }),
      });
      if (!res.ok) throw new Error("Durum güncellenemedi");
      const result = await res.json();
      if (result.policy) {
        Alert.fireToast({ type: "success", message: "Ödeme başarılı ve poliçe oluşturuldu!" });
        navigate("/");
      } else {
        fetchPayments();
        Alert.fireToast({ type: "success", message: "Ödeme başarılı!" });
      }
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Ödeme Yönetimi</h1>
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
              name="quote_id"
              value={form.quote_id}
              onChange={handleChange}
              placeholder="Teklif ID"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Tutar"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              placeholder="Ödeme Yöntemi"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="installment_option"
              value={form.installment_option}
              onChange={handleChange}
              placeholder="Taksit Seçeneği"
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {"Güncelle"}
          </button>
          {editingId && (
            <button
              type="button"
              className="mt-4 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              onClick={() => { setForm(emptyPayment); setEditingId(null); }}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </form>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mt-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-2">Ödemeler</h2>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 font-bold text-center align-middle">ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Kullanıcı ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Teklif ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Plaka</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Marka/Model</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Tutar</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Yöntem</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Taksit</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Durum</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map((p) => {
                  const vehicle = p.Quote?.Vehicle;
                  return (
                    <tr key={p.payment_id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition">
                      <td className="px-4 py-2 text-center align-middle">{p.payment_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.user_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.quote_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{vehicle?.plate_number || "-"}</td>
                      <td className="px-4 py-2 text-center align-middle">{vehicle?.brand_model || "-"}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.amount}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.payment_method}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.installment_option}</td>
                      <td className="px-4 py-2 text-center align-middle">{p.payment_status}</td>
                      <td className="px-4 py-2 text-center align-middle flex justify-center gap-2">
                        <button
                          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                          onClick={() => handleEdit(p)}
                          disabled={loading}
                        >Düzenle</button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDelete(p.payment_id)}
                          disabled={loading}
                        >Sil</button>
                        <button
                          className={`bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                          onClick={() => handlePaid(p)}
                          disabled={loading || p.payment_status === "Başarılı"}
                        >Ödendi</button>
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

export default PaymentPage; 