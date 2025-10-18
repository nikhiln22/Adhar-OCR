import { AadhaarOCRPage } from "./pages/AadharOcrPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AadhaarOCRPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
