import { createContext, useState } from "react";

interface SaleContextProps {
    isSuccess: boolean;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  }
export const SaleContext = createContext<SaleContextProps>({
  isSuccess: false,
  setIsSuccess: ()=>{}
});

export const SaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  return (
    <SaleContext.Provider value={{ isSuccess, setIsSuccess }}>
      {children}
    </SaleContext.Provider>
  );
};
