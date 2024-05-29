"use client";
import React from "react";
import TablaSolicitudes from "../components/Solicitudes/TablaSolicitudes";
import { Typography } from "@material-tailwind/react";

const Solicitudes = () => {
  return (
    <section className="h-screen flex flex-col gap-4 items-center p-10 bg-gray-200">
      <Typography
        variant="h2"
        color="blue-gray"
        className="font-normal"
      >Solicitudes</Typography>
      <TablaSolicitudes />
    </section>
  );
};

export default Solicitudes;
