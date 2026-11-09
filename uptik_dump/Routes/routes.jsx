import React, { useState } from "react";
import ScrollToTop from "../Util/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Aboutus from "../pages/Aboutus/Aboutus";
import Faqs from "../pages/Faqs/Faqs";
import Contact from "../pages/Contact/Contact";
import Privacy from "../components/Privacy/Privacy";
import Register from "../pages/Register/Register";
import RefundPolicy from "../pages/RefundPolicy/refund";
import Terms from "../components/Terms/Terms";
function Router() {
    return (
        <div>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                 <Route path="/terms" element={<Terms />} />
                <Route path="/register" element={<Register />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
            </Routes>
        </div>
    );
}

export default Router;
