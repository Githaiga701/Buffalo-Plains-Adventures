import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index        = lazy(() => import("./pages/Index"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Packages     = lazy(() => import("./pages/Packages"));
const PackageDetail= lazy(() => import("./pages/PackageDetail"));
const Gallery      = lazy(() => import("./pages/Gallery"));
const About        = lazy(() => import("./pages/About"));
const Contact      = lazy(() => import("./pages/Contact"));
const FAQ          = lazy(() => import("./pages/FAQ"));
const Terms       = lazy(() => import("./pages/Terms"));
const NotFound     = lazy(() => import("./pages/NotFound"));
const Booking      = lazy(() => import("./pages/Booking"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/"            element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/packages"    element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/booking"     element={<Booking />} />
              <Route path="/gallery"     element={<Gallery />} />
              <Route path="/about"       element={<About />} />
              <Route path="/contact"     element={<Contact />} />
              <Route path="/faq"         element={<FAQ />} />
              <Route path="/terms"       element={<Terms />} />
              <Route path="*"            element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
        <SpeedInsights />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;