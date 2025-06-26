import { createContext, useContext, useState } from "react";

export const ProfessorContext = createContext<
  | {
      professorId: string;
      setProfessorId: React.Dispatch<React.SetStateAction<string>>;
      trigger: number;
      setTrigger: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);

export const ProfessorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [professorId, setProfessorId] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(0);
  return (
    <ProfessorContext.Provider
      value={{ professorId, setProfessorId, trigger, setTrigger }}
    >
      {children}
    </ProfessorContext.Provider>
  );
};

export function useProfessor() {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error("useProfessor must be used within a ProfessorProvider");
  }
  const { professorId, setProfessorId, trigger, setTrigger } = context;
  return { professorId, setProfessorId, trigger, setTrigger };
}
