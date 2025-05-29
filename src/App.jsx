import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
const PageHome = React.lazy(() => import("./pages/PageHome"));
const PageAboutUs = React.lazy(() => import("./pages/PageAboutUs"));
const PageShop = React.lazy(() => import("./pages/PageShop"));
const ErrorPage400 = React.lazy(() => import("./pages/ErrorPage400"));
const ErrorPage401 = React.lazy(() => import("./pages/ErrorPage401"));
const ErrorPage403 = React.lazy(() => import("./pages/ErrorPage403"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const CareerPage = React.lazy(() => import("./pages/CareerPage"));
const ContactUsPage = React.lazy(() => import("./pages/ContactUsPage"));
const CustomerReviewsPage = React.lazy(() => import("./pages/CustomerReviewsPage"));
const Quotes = React.lazy(() => import("./pages/Quotes"));
const PageShopDetail = React.lazy(() => import("./pages/PageShopDetail"));
const QuotesDetail = React.lazy(() => import("./pages/QuotesDetail"));
import Loading from "./components/Loading";



function App() {
  return (
     <div className="bg-gray-100 min-h-screen">
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageHome />} />
          <Route path="/PageShop" element={<PageShop />} />
          <Route path="/products/:id" element={<PageShopDetail/>} />
          <Route path="/PageAboutUs" element={<PageAboutUs />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          <Route path="/CareerPage" element={<CareerPage/>} />
          <Route path="/ContactUsPage" element={<ContactUsPage/>} />
          <Route path="/CustomerReviewsPage" element={<CustomerReviewsPage/>} />
          <Route path="/Quotes" element={<Quotes/>} />
          <Route path="/quotes/:id" element={<QuotesDetail />} />
        </Route>

        <Route path="/ErrorPage400" element={<ErrorPage400 />} />
        <Route path="/ErrorPage401" element={<ErrorPage401 />} />
        <Route path="/ErrorPage403" element={<ErrorPage403 />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
    </div>
  );
}

export default App;
