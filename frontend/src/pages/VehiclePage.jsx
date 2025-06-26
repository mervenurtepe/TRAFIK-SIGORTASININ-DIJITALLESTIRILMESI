import React, { useEffect, useState } from "react";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_URL = "http://localhost:5000/api/vehicles";
const USER_API_URL = "http://localhost:5000/api/users";

const emptyVehicle = {
  user_id: "",
  plate_number: "",
  brand_model: "",
  tc_identity_number: "",
};

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyVehicle);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setVehicles(data);
      // Alert.fireToast({ type: "success", message: "Araçlar başarıyla alındı!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: "Araçlar alınamadı" });
    }
    setLoading(false);
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
    fetchVehicles();
    fetchUsers();
  }, []);

  const sortedVehicles = [...vehicles].sort((a, b) => b.vehicle_id - a.vehicle_id);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUserSelect = (e) => {
    const selectedId = e.target.value;
    setForm((prev) => {
      const selectedUser = users.find((u) => String(u.user_id) === String(selectedId));
      return {
        ...prev,
        user_id: selectedId,
        tc_identity_number: selectedUser ? selectedUser.tc_identity_number : "",
      };
    });
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
      setForm(emptyVehicle);
      setEditingId(null);
      fetchVehicles();
      Alert.fireToast({ type: "success", message: editingId ? "Araç güncellendi!" : "Araç eklendi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  const handleEdit = (vehicle) => {
    setForm({
      user_id: vehicle.user_id,
      plate_number: vehicle.plate_number,
      brand_model: vehicle.brand_model,
      tc_identity_number: vehicle.tc_identity_number,
    });
    setEditingId(vehicle.vehicle_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchVehicles();
      Alert.fireToast({ type: "success", message: "Araç silindi!" });
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Araç Yönetimi</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mb-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleUserSelect}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Kullanıcı Seçiniz</option>
              {users.map((u) => (
                <option key={u.user_id} value={u.user_id}>
                  {u.name} {u.surname} ({u.email})
                </option>
              ))}
            </select>
            <input
              name="plate_number"
              value={form.plate_number}
              onChange={handleChange}
              placeholder="Plaka Numarası"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="brand_model"
              value={form.brand_model}
              onChange={handleChange}
              placeholder="Marka/Model"
              className="border rounded px-3 py-2"
            />
            <input
              name="tc_identity_number"
              value={form.tc_identity_number}
              placeholder="TC Kimlik No"
              className="border rounded px-3 py-2"
              disabled
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
              onClick={() => { setForm(emptyVehicle); setEditingId(null); }}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </form>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">Araçlar</h2>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 font-bold text-center align-middle">ID</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Kullanıcı</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Plaka</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">Marka/Model</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">TC Kimlik No</th>
                  <th className="px-4 py-2 font-bold text-center align-middle">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sortedVehicles.map((v) => {
                  const user = users.find((u) => u.user_id === v.user_id);
                  return (
                    <tr key={v.vehicle_id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition">
                      <td className="px-4 py-2 text-center align-middle">{v.vehicle_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{user ? `${user.name} ${user.surname}` : v.user_id}</td>
                      <td className="px-4 py-2 text-center align-middle">{v.plate_number}</td>
                      <td className="px-4 py-2 text-center align-middle">{v.brand_model}</td>
                      <td className="px-4 py-2 text-center align-middle">{v.tc_identity_number}</td>
                      <td className="px-4 py-2 text-center align-middle flex justify-center">
                        <button
                          className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                          onClick={() => handleEdit(v)}
                          disabled={loading}
                        >Düzenle</button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDelete(v.vehicle_id)}
                          disabled={loading}
                        >Sil</button>
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

export default VehiclePage; 