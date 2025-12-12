import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddProductPage from './pages/AddProductPage';
import ProductsPage from './pages/Products';
import CustomersPage from './pages/Customers';
import OrdersPage from './pages/Orders';
import OrderDetailPage from './pages/OrderDetailPage';
import EditProductPage from './pages/EditProductPage';

import "./styles/global.css"; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Main content grows to fill available space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<ProductsPage />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="edit-product/:id" element={<EditProductPage />} />

              <Route path="customers" element={<CustomersPage />} />
               <Route path="orders" element={<OrdersPage />} />
               <Route path="order-detail/:id" element={<OrderDetailPage />} />
               


            </Route>
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
