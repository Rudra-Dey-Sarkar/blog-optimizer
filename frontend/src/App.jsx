import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Article from "./components/Article";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}
