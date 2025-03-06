'use client'

import React, { createContext, useContext, useState } from 'react';

interface Program {
    id: string;
    name: string;
}

interface ProgramContextType {
    selectedPrograms: Program[];
    addProgram: (program: Program) => void;
    removeProgram: (programId: string) => void;
}

const SelectorProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const useSelectorProgramContext = () => {
    const context = useContext(SelectorProgramContext);
    if (!context) {
        throw new Error('useProgramContext must be used within a ProgramProvider');
    }
    return context;
};

export const SelectorProgramProvider = (
    { children }: { children: React.ReactNode }
) => {
    const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);

    const addProgram = (program: Program) => {
        setSelectedPrograms((prev) => [...prev, program]);
    };

    const removeProgram = (programId: string) => {
        setSelectedPrograms((prev) => prev.filter((program) => program.id !== programId));
    };

    return (
        <SelectorProgramContext.Provider
            value={{ selectedPrograms, addProgram, removeProgram }}
        >
            {children}
        </SelectorProgramContext.Provider>
    );
};
