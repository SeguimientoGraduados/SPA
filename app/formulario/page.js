'use client';
import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Footer/FooterComponent"
import Form from "../components/Formulario/FormularioComponent"
import React from "react";

const Formulario = () => {
  return (
    <main>
      <Header />
      <section className="bg-gray-200 flex min-h-screen flex-col items-center justify-between p-24">
        <Form />
      </section>
      <Footer />
    </main>
  );
};

export default Formulario;
