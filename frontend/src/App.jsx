import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/landing";
import Article from "./components/articles/article";
import TopBar from "./components/top-bar/top-bar";
import Footer from "./components/footer/footer";

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
