import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";
import "./css/style.css";

import NewSidebar from "./partials/NewSidebar";
import LoadingComponent from "./components/LoadingComponent";
import Header from "./partials/Header";

// Lazy load all components
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const SummaryPage = lazy(() => import("./pages/PolicePage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const VehiclePage = lazy(() => import("./pages/VehiclePage"));
const QuotePage = lazy(() => import("./pages/QuotePage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const QuoteCreatePage = lazy(() => import("./pages/QuoteCreatePage"));


function App() {
  // const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTokenSetted, setIsTokenSetted] = useState(true);

  // Fallback component for Suspense
  const SuspenseFallback = () => (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cageCarbonBlue-500"></div>
    </div>
  );

  return (
    <>
      {isTokenSetted ? (
        <div className="flex h-[100dvh] overflow-hidden">
          <NewSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div
            className="
          relative flex flex-col flex-1
          overflow-y-auto
          overflow-x-hidden
          custom-scrollbar
          "
          >
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Suspense fallback={<SuspenseFallback />}>
              <Routes>
                <Route exact path="/" element={<SummaryPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/vehicles" element={<VehiclePage />} />
                <Route path="/quotes" element={<QuotePage />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/feedbacks" element={<FeedbackPage />} />
                <Route path="/quote-create" element={<QuoteCreatePage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default App;
