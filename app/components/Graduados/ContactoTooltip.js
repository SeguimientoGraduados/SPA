import { Tooltip, Typography, Button } from "@material-tailwind/react";
import { faAddressCard, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const ContactoTooltip = ({ habilitado = "", cv, redes = [] }) => {
  const ensureProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <Tooltip
      className="z-50 bg-white w-20"
      content={
        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            {habilitado != "" && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} color="grey"/>
                <Typography variant="paragraph" className="ml-2" color="blue-gray">
                  <a href={`mailto:${habilitado}`}>{habilitado}</a>
                </Typography>
              </div>
            )}

            {redes.length > 0 && (
              <div>
                <div className="flex flex-row gap-4 justify-center mt-1">
                  {redes.map((item, index) => (
                    <a
                      key={index}
                      href={ensureProtocol(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.rrss === "facebook" && (
                        <FontAwesomeIcon icon={faFacebook} color="grey" />
                      )}
                      {item.rrss === "twitter" && (
                        <FontAwesomeIcon icon={faXTwitter} color="grey"/>
                      )}
                      {item.rrss === "linkedin" && (
                        <FontAwesomeIcon icon={faLinkedin} color="grey"/>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {cv && (
              <a
                href={ensureProtocol(cv)}
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
      }
    >
      <FontAwesomeIcon
        icon={faAddressCard}
        color={habilitado != "" ? "blue" : "gray"}
      />
    </Tooltip>
  );
};

export default ContactoTooltip;
