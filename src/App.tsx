import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. O seu esquema customizado
    const appUrl = "gymfy://";

    // 2. Tenta abrir o app
    window.location.href = appUrl;

    // 3. Fallback: Se o app não abrir em 2 segundos,
    // você decide o que fazer (ex: mandar para a App Store)
    const timeout = setTimeout(() => {
      console.log("O app não parece estar instalado.");
      // window.location.href = "https://play.google.com/store/apps/details?id=seu.app";
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <></>;
}

export default App;
