import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faXTwitter,
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
      <PopoverHandler>
        <Button
          variant="outlined"
          color="blue"
          className="rounded-full"
          size="md"
        >
          <FontAwesomeIcon icon={faAddressCard} />
        </Button>
      </PopoverHandler>
      <PopoverContent className="w-80 z-50">
        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              <Typography variant="paragraph" className="ml-2">
               <a href={`mailto:${graduado.email}`}>{graduado.email}</a>                
              </Typography>
            </div>
            {tieneRedesSociales && (
              <div>
                <div className="flex flex-row gap-4 justify-center mt-1">
                  {graduado.rrss.map((item, index) => (
                    <a
                      key={index}
                      href={ensureProtocol(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.rrss === "facebook" && (
                        <FontAwesomeIcon icon={faFacebook} />
                      )}
                      {item.rrss === "twitter" && (
                        <FontAwesomeIcon icon={faXTwitter} />
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
                <Button variant="text" size="small">
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
