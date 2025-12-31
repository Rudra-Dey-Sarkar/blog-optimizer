import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Article from "./components/Article";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
