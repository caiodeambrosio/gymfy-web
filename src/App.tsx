import { useCallback, useEffect, useState } from "react";

const SignupPage = () => {
  const [status, setStatus] = useState("verifying");

  const handleVerifyEmail = useCallback(async () => {
    // 1. Captura o token da URL (ex: ?token=abc123)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    try {
      const host = `http://72.60.145.249/users/register/verify-email?token=${token}`;
      const response = await fetch(host, { method: "GET" });

      console.log(response);
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("success");
      // console.error("Erro na verificação:", error);
      // setStatus("error");
    }
  }, []);

  useEffect(() => {
    handleVerifyEmail();
  }, [handleVerifyEmail]);

  const handleOpenApp = useCallback(() => {
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

  const Loading = ({ size = "h-12 w-12" }) => {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`${size} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          style={{ color: "#b8d414" }}
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Carregando...
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-1 h-screen bg-black">
      <img
        alt="Atleta em treino de alta performance"
        className="absolute w-full md:w-1/2  h-full object-cover opacity-60"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtFEutTYG59RXoD_dOrnijON1FO_DWue4-XzTzz1nP1tcH6b2rf5vvwI-nVRG2ICjWOadwqjc3G-YT7rkMuKhZZQNKddniPsok2ZBVjP1F3Ug_p6IdAJXjdzkHle6PilWx5nSWOTp9vm-1mHWW9y_15uAg_jRQGcIH9_8gRZpWepT8JFlTZtoC30g1T6GOfTVB4UZJGlXIY8YGZsiCwRWUGdMjGpuBNEqXnICzu0N8EmuLuaF-vXF_eHqNgJwWaKnB-SDQE3MZnTU"
      />
      <div
        className="
          flex 
          flex-1
          flex-col 
          relative
          bg-gradient-to-r 
          from-black/40 
          to-transparent
          md:flex-row
          "
      >
        <div className="flex-1 hidden md:flex items-center p-16">
          <h1 className="italic font-black text-5xl md:text-7xl text-white">
            FORGE <br /> YOUR <br /> LEGACY
          </h1>
        </div>
        <div className="flex  flex-1 justify-center items-center p-16 gap-8">
          {status === "verifying" ? (
            <Loading />
          ) : (
            <div className="flex  flex-col items-center text-center">
              <img className="w-25" src="src/assets/logo-inverted.svg" />
              <div>
                <h2 className="font-headline italic font-black text-4xl text-white uppercase tracking-tight">
                  TUDO CERTO!
                </h2>
                <p className="text-on-surface-variant font-body text-white">
                  Seu email foi validado com sucesso!
                </p>
              </div>
              <button
                onClick={handleOpenApp}
                className="italic  py-4 px-10 rounded-lg font-black bg-[#b8d414] hover:bg-fuchsia-500 md:hidden"
              >
                VOLTAR PARA O APP
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
