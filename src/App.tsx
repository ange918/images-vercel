import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Formations } from "@/pages/Formations";
import { FormationDetail } from "@/pages/FormationDetail";
import { Services } from "@/pages/Services";
import { Ceremonies } from "@/pages/Ceremonies";
import { About } from "@/pages/About";
import { News } from "@/pages/News";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="formations" element={<Formations />} />
        <Route path="formations/:id" element={<FormationDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="ceremonies" element={<Ceremonies />} />
        <Route path="a-propos" element={<About />} />
        <Route path="actualites" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
