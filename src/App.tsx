import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import { CacheDebugPanel } from "./components/cache-debug-panel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      {process.env.NODE_ENV === "development" && <CacheDebugPanel />}
    </BrowserRouter>
  );
}
