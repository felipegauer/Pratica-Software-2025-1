import { createContext, useContext, useState } from "react";

export const ProfessorContext = createContext<
  | {
      professorId: string;
      setProfessorId: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export const ProfessorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [professorId, setProfessorId] = useState<string>("");
  return (
    <ProfessorContext.Provider value={{ professorId, setProfessorId }}>
      {children}
    </ProfessorContext.Provider>
  );
};

export function useProfessor() {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error("useProfessor must be used within a ProfessorProvider");
  }
  const { professorId, setProfessorId } = context;
  return { professorId, setProfessorId };
}
