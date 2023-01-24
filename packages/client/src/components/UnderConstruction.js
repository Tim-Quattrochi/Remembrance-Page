import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const UnderConstruction = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return show ? (
    <Alert variant="info" onClose={() => setShow(false)} dismissible>
      This site is still being worked on. If you see any bugs, please
      contact the Administrator.
    </Alert>
  ) : null;
};

export default UnderConstruction;
