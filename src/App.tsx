import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import WorksheetPage from "@/pages/WorksheetPage";

export default function App() {
  return (
    <BrowserRouter basename="/CH4011-pracs">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiment/:experimentNumber" element={<WorksheetPage />} />
      </Routes>
    </BrowserRouter>
  );
}