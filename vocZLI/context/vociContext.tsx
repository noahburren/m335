import { createContext, ReactNode, useContext, useState } from "react";
import initialVociList from "../data/vociList";
import type Voci from "../models/voci";

interface VociContextType {
    vociList: Voci[];
    addVoci: (voci: Voci) => void;
    updateVoci: (term: string, updatedVoci: Voci) => void;
    removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [vociList, setVociList] = useState<Voci[]>(initialVociList);

    const addVoci = (voci: Voci) => {
        setVociList((currentVociList) => [...currentVociList, voci]);
    };

    const updateVoci = (term: string, updatedVoci: Voci) => {
        setVociList((currentVociList) =>
            currentVociList.map((voci) =>
                voci.term === term ? updatedVoci : voci
            )
        );
    };

    const removeVoci = (term: string) => {
        setVociList((currentVociList) =>
            currentVociList.filter((voci) => voci.term !== term)
        );
    };

    return (
        <VociContext.Provider
            value={{ vociList, addVoci, updateVoci, removeVoci }}
        >
            {children}
        </VociContext.Provider>
    );
}

export function useVoci() {
    const context = useContext(VociContext);

    if (!context) {
        throw new Error("useVoci muss innerhalb von VociProvider verwendet werden");
    }

    return context;
}
