"use client";

import { useState, useEffect } from "react";
import { Input, Typography, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import TooltipInfo from "../Utils/TooltipInfo";
import RadioHorizontal from "../Utils/RadioHorizontal";

const socialMediaIcons = {
  linkedin: faLinkedin,
  facebook: faFacebook,
  twitter: faXTwitter,
};

const SocialMediaInput = ({ label, placeholder, value, onChange, onRemove, error }) => (
  <div>
    <div className="flex flex-row items-center gap-3">
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        className="bg-tremor-background"
      />
      <IconButton
        className="rounded-full"
        onClick={onRemove}
        variant="gradient"
        color="red"
        size="sm"
      >
        <FontAwesomeIcon icon={faMinus} />
      </IconButton>
    </div>
    {error && <span className="text-xs text-red-600 -mt-2">{error}</span>}
  </div>
);

const Contacto = ({ handleChange, opcionesRrss, error = {}, valoresIniciales = [] }) => {
  const [socialMedia, setSocialMedia] = useState({
    linkedin: "",
    facebook: "",
    twitter: "",
  });

  const [visibleSocialMedia, setVisibleSocialMedia] = useState({
    linkedin: true,
    facebook: false,
    twitter: false,
  });

  useEffect(() => {
    const initialSocialMedia = { ...socialMedia };
    const initialVisibility = { ...visibleSocialMedia };

    valoresIniciales.forEach((item) => {
      initialSocialMedia[item.rrss] = item.url;
      initialVisibility[item.rrss] = true;
    });

    setSocialMedia(initialSocialMedia);
    setVisibleSocialMedia(initialVisibility);
  }, [valoresIniciales]);

  const handleSocialMediaChange = (e, type) => {
    setSocialMedia((prev) => ({ ...prev, [type]: e.target.value }));
    handleChange(e, type);
  };

  const toggleSocialMedia = (type) => {
    setVisibleSocialMedia((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const getLabel = (value) => {
    const option = opcionesRrss.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <div>
      <Typography variant="h5" color="blue-gray" className="font-normal text-center mt-4">
        Información de Contacto
      </Typography>
      <div className="flex flex-row justify-center">
        <TooltipInfo label={"Privacidad de Contacto:"} />
        <RadioHorizontal />
      </div>
      <div className="grid gap-2 my-6">
        {Object.entries(visibleSocialMedia).map(([type, isVisible]) =>
          isVisible && (
            <SocialMediaInput
              key={type}
              label={getLabel(type)}
              placeholder={`https://www.${type}.com/ejemplo/`}
              value={socialMedia[type]}
              onChange={(e) => handleSocialMediaChange(e, type)}
              onRemove={() => toggleSocialMedia(type)}
              error={error[type]}
            />
          )
        )}

        <div className="flex flex-row gap-6 justify-center">
          {Object.entries(visibleSocialMedia).map(([type, isVisible]) =>
            !isVisible && (
              <IconButton
                key={type}
                className="rounded-full"
                onClick={() => toggleSocialMedia(type)}
                color="blue"
                variant="gradient"
                size="lg"
              >
                <FontAwesomeIcon icon={socialMediaIcons[type]} />
              </IconButton>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacto;