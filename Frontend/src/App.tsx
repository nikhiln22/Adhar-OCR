import { AadhaarOCRPage } from "./pages/AadharOcrPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AadhaarOCRPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
