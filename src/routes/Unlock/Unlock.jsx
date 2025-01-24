import { useEffect, useState } from "react";
import ApiManager from "../../api/ApiManager/ApiManager";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import { useNavigate } from "react-router-dom";
import { log } from "three/webgpu";

export default function Unlock() {
  const api = new ApiManager();
  const navigate = useNavigate();
  const [message, setMessage] = useState(["X"]);

  useEffect(() => {
    api
      .post(`unlock`)
      .then((response) => {
        console.log(response); 
        if (response.data.phase && response.data.phase === 3) {
          setMessage("Una nuova fase è stata sbloccata");
          navigate("/");
        }
        else if (response.data.phase && response.data.phase === 2) {
          setMessage("Aggiorna la pagina");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Indovina tutti i codici prima");
      });
  }, []);

  return (
    <GridLayout>
      <SectionHeader content={message} />
    </GridLayout>
  );
}
