"use client";

import { useState } from "react";
import { Input, Typography, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const ContactoComponent = ({ handleChange }) => {
  const [showFacebook, setShowFacebook] = useState(false);
  const [showTwitter, setShowTwitter] = useState(false);

  const handleMostrarFacebook = () => {
    setShowFacebook((cur) => !cur);
  };

  const handleMostrarTwitter = () => {
    setShowTwitter((cur) => !cur);
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
          label="Linkedin"
          placeholder="https://www.linkedin.com/in/ejemplo/"
          onChange={(e) => handleChange(e, "linkedin")}
        />

        {showFacebook && (
          <div className="flex flex-row items-center gap-3">
            <Input
              label="Facebook"
              placeholder="https://www.facebook.com/ejemplo/"
              onChange={(e) => handleChange(e, "facebook")}
            />
            <IconButton
              variant="outlined"
              onClick={handleMostrarFacebook}
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
              label="Twitter"
              placeholder="https://www.twitter.com/ejemplo/"
              onChange={(e) => handleChange(e, "twitter")}
            />
            <IconButton
              variant="outlined"
              onClick={handleMostrarTwitter}
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
              color="blue"
              variant="outlined"
              onClick={handleMostrarTwitter}
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
