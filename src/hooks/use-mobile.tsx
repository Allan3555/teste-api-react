
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Verificar imediatamente para evitar flash na UI
    checkMobile();
    
    // Adicionar listener para mudanças de tamanho da tela
    window.addEventListener("resize", checkMobile);
    
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile);
      return () => {
        mql.removeEventListener("change", checkMobile);
        window.removeEventListener("resize", checkMobile);
      };
    } else {
      // Fallback para navegadores que não suportam addEventListener no MediaQueryList
      mql.addListener(checkMobile);
      return () => {
        mql.removeListener(checkMobile);
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  return isMobile;
}
