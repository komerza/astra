import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/cart-context';
import { Toaster } from 'sonner';
import { KomerzaProvider } from './KomerzaProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <KomerzaProvider>
      <CartProvider>
        <App />
        <Toaster />
      </CartProvider>
    </KomerzaProvider>
  </React.StrictMode>,
);
