import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const ContactoPopover = ({ graduado }) => {
  const ensureProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const tieneRedesSociales = graduado.rrss && graduado.rrss.length > 0;

  return (
    <Popover>
      <PopoverHandler asChild>
        <Button
          variant="outlined"
          color="blue"
          className="rounded-full"
          size="md"
        >
          <FontAwesomeIcon icon={faAddressCard} />
        </Button>
      </PopoverHandler>
      <PopoverContent className="w-80">
        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            <Typography variant="paragraph">
              Correo: {graduado.email}
            </Typography>
            {tieneRedesSociales && (
              <div>
                <div className="flex flex-row gap-4 justify-center mt-1">
                  {graduado.rrss.map((item) => (
                    <a
                      href={ensureProtocol(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.rrss === "facebook" && (
                        <FontAwesomeIcon icon={faFacebook} />
                      )}
                      {item.rrss === "twitter" && (
                        <FontAwesomeIcon icon={faTwitter} />
                      )}
                      {item.rrss === "linkedin" && (
                        <FontAwesomeIcon icon={faLinkedin} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {graduado.cv && (
              <a
                href={ensureProtocol(graduado.cv)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button asChild variant="text" size="small">
                  Ver CV
                </Button>
              </a>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ContactoPopover;