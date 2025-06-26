import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/customAlertComponents/CustomAlert";

const API_QUOTES_URL = "http://localhost:5000/api/quotes";

const QuoteCreatePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [plate, setPlate] = useState("");
  const [foundVehicle, setFoundVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showQuotes, setShowQuotes] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [success, setSuccess] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  // Kullanıcı id dummy olarak 10567 (örnek) - gerçek login ile değiştirilebilir
  const USER_ID = 10567;

  useEffect(() => {
    // Kullanıcıya ait araçları çek
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/vehicles`);
        const data = await res.json();
        setVehicles(data);
        // Alert.fireToast({ type: "success", message: "Araçlar başarıyla alındı!" });
      } catch (err) {
        Alert.fire({ type: "error", title: "Hata", message: "Araçlar alınamadı" });
      }
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  // Araç seçilince veya plaka ile araç bulunduğunda teklifleri çek
  useEffect(() => {
    const fetchQuotes = async (vehicleId) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_QUOTES_URL}?vehicle_id=${vehicleId}`);
        const data = await res.json();
        setQuotes(data);
        // Alert.fireToast({ type: "success", message: "Teklifler başarıyla alındı!" });
      } catch (err) {
        setQuotes([]);
        Alert.fire({ type: "error", title: "Hata", message: "Teklifler alınamadı" });
      }
      setLoading(false);
    };
    if (showQuotes && selectedVehicleId) {
      fetchQuotes(selectedVehicleId);
    }
  }, [showQuotes, selectedVehicleId]);

  // Plaka ile araç bul
  const handlePlateSearch = () => {
    setError("");
    const found = vehicles.find(v => v.plate_number.toLowerCase() === plate.toLowerCase());
    if (found) {
      setFoundVehicle(found);
      setSelectedVehicleId(found.vehicle_id);
      setShowQuotes(true);
    } else {
      setError("Bu plakaya ait araç bulunamadı.");
      setShowQuotes(false);
      setQuotes([]);
    }
  };

  // Dropdown ile araç seçimi
  const handleVehicleSelect = (e) => {
    setSelectedVehicleId(e.target.value);
    setFoundVehicle(vehicles.find(v => v.vehicle_id === Number(e.target.value)));
    setShowQuotes(true);
    setError("");
  };

  // Teklif seçimi ve kaydı
  const handleQuoteSelect = async (quote) => {
    setLoading(true);
    setError("");
    setSelectedQuote(quote);
    try {
      // Payment kaydı oluştur
      const vehicle = vehicles.find(v => v.vehicle_id === Number(selectedVehicleId));
      const paymentRes = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: vehicle ? vehicle.user_id : USER_ID,
          quote_id: quote.quote_id,
          amount: quote.price,
          payment_method: "Kredi Kartı", // dummy
          installment_option: "Tek Çekim", // dummy
          payment_status: "Beklemede", // dummy
        }),
      });
      if (!paymentRes.ok) throw new Error("Ödeme kaydedilemedi");
      setSuccess(true);
      Alert.fireToast({ type: "success", message: "Teklif başarıyla kaydedildi! Yönlendiriliyorsunuz..." });
      setTimeout(() => {
        navigate("/payments");
      }, 1500);
    } catch (err) {
      Alert.fire({ type: "error", title: "Hata", message: err.message });
    }
    setLoading(false);
  };

  return (
    <main className="p-6 bg-gray-50 dark:bg-gray-900">
      <div className="p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Teklif Oluştur</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center animate-pulse">
            Teklif başarıyla kaydedildi! Yönlendiriliyorsunuz...
          </div>
        )}
        <div className="max-w-2xl text-left">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-6">
          <label className="block mb-2 font-semibold">Araç Seçin</label>
          <select
            className="w-full border rounded px-3 py-2 mb-2"
            value={selectedVehicleId}
            onChange={handleVehicleSelect}
          >
            <option value="">Araç seçiniz</option>
            {vehicles.map((v) => (
              <option key={v.vehicle_id} value={v.vehicle_id}>
                {v.plate_number} - {v.brand_model}
              </option>
            ))}
          </select>
          <div className="my-2 text-center text-gray-500">veya</div>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Plaka ile sorgula (örn: 34ABC123)"
            value={plate}
            onChange={e => setPlate(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            onClick={handlePlateSearch}
            disabled={loading}
          >
            Plaka ile Sorgula
          </button>
        </div>
        </div>
        {showQuotes && (
          <div>
            <h2 className="text-lg font-bold mb-4">Sigorta Şirketi Teklifleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {quotes.length === 0 ? (
                <div className="col-span-2 text-center text-gray-500">Bu araca ait teklif bulunamadı.</div>
              ) : (
                quotes.map((q, idx) => (
                  <div
                    key={q.quote_id}
                    className={`rounded-xl border shadow p-4 flex flex-col gap-2 transition hover:scale-105 cursor-pointer ${selectedQuote === q ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => handleQuoteSelect(q)}
                    style={{ background: selectedQuote === q ? "#e0f2fe" : "" }}
                  >
                    <div className="font-semibold text-blue-700">{q.insurance_company}</div>
                    <div className="text-2xl font-bold">{q.price?.toLocaleString()} TL</div>
                    <div className="text-gray-600">{q.coverage}</div>
                    <button
                      className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      disabled={loading}
                    >
                      Bu Teklifi Seç
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default QuoteCreatePage; 