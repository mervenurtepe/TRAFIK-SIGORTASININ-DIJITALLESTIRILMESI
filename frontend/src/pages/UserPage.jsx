import React, { useEffect, useState } from "react";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_URL = "http://localhost:5000/api/users";

const emptyUser = {
  email: "",
  name: "",
  surname: "",
  tel: "",
  address: "",
  tc_identity_number: "",
};

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
      // Alert.fireToast({ type: "success", message: "Kullanıcılar başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Kullanıcılar alınamadı" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.user_id - a.user_id);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
      setForm(emptyUser);
      setEditingId(null);
      fetchUsers();
      Alert.fireToast({ type: "success", message: editingId ? "Kullanıcı güncellendi!" : "Kullanıcı eklendi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  const handleEdit = (user) => {
    setForm({
      email: user.email,
      name: user.name,
      surname: user.surname,
      tel: user.tel,
      address: user.address,
      tc_identity_number: user.tc_identity_number,
    });
    setEditingId(user.user_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchUsers();
      Alert.fireToast({ type: "success", message: "Kullanıcı silindi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Kullanıcı Yönetimi</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E-posta"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ad"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Soyad"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="tel"
              value={form.tel}
              onChange={handleChange}
              placeholder="Telefon"
              className="border rounded px-3 py-2"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Adres"
              className="border rounded px-3 py-2"
            />
            <input
              name="tc_identity_number"
              value={form.tc_identity_number}
              onChange={handleChange}
              placeholder="TC Kimlik No"
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
              onClick={() => { setForm(emptyUser); setEditingId(null); }}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </form>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">Kullanıcılar</h2>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 font-bold text-center align-middle">ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">E-posta</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Ad</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Soyad</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Telefon</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Adres</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">TC Kimlik No</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Oluşturulma</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((u) => (
                  <tr key={u.user_id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition">
                    <td className="px-4 py-2 text-center align-middle">{u.user_id}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.email}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.name}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.surname}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.tel}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.address}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.tc_identity_number}</td>
                    <td className="px-4 py-2 text-center align-middle">{u.created_at ? u.created_at.slice(0,10) : ""}</td>
                    <td className="px-4 py-2 text-center align-middle flex justify-center">
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                        onClick={() => handleEdit(u)}
                        disabled={loading}
                      >Düzenle</button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(u.user_id)}
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

export default UserPage; 