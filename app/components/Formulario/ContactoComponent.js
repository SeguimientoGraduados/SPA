"use client";

import { useState } from "react";
import { Input, Typography, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const ContactoComponent = ({ handleChange, opcionesRrss }) => {
  const [showFacebook, setShowFacebook] = useState(false);
  const [showTwitter, setShowTwitter] = useState(false);

  const handleMostrarFacebook = () => {
    setShowFacebook((cur) => !cur);
  };

  const handleMostrarTwitter = () => {
    setShowTwitter((cur) => !cur);
  };

  const getLabel = (value) => {
    const option = opcionesRrss.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <div>
      <Typography
        variant="h5"
        color="blue-gray"
        className="font-normal text-center mt-2"
      >
        Informacion de Contacto
      </Typography>
      <div className="grid gap-2 my-6">
        <Input
          label={getLabel('linkedin')}
          placeholder="https://www.linkedin.com/in/ejemplo/"
          onBlur={(e) => handleChange(e, "linkedin")}
        />

        {showFacebook && (
          <div className="flex flex-row items-center gap-3">
            <Input
              label={getLabel('facebook')}
              placeholder="https://www.facebook.com/ejemplo/"
              onBlur={(e) => handleChange(e, "facebook")}
            />
            <IconButton
              className="rounded-full"
              onClick={handleMostrarFacebook}
              variant="outlined"
              color="red"
              size="sm"
            >
              <FontAwesomeIcon icon={faMinus} />
            </IconButton>
          </div>
        )}

        {showTwitter && (
          <div className="flex flex-row items-center gap-3">
            <Input
              label={getLabel('twitter')}
              placeholder="https://www.twitter.com/ejemplo/"
              onBlur={(e) => handleChange(e, "twitter")}
            />
            <IconButton
              className="rounded-full"
              onClick={handleMostrarTwitter}
              variant="outlined"
              color="red"
              size="sm"
            >
              <FontAwesomeIcon icon={faMinus} />
            </IconButton>
          </div>
        )}

        <div className="flex flex-row gap-6 justify-center">
          {!showFacebook && (
            <IconButton
              className="rounded-full"
              onClick={handleMostrarFacebook}
              color="blue"
              variant="outlined"
              size="lg"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
          )}

          {!showTwitter && (
            <IconButton
              className="rounded-full"
              onClick={handleMostrarTwitter}
              color="blue"
              variant="outlined"
              size="lg"
            >
              
              <FontAwesomeIcon icon={faXTwitter} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactoComponent;
