"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

export interface IStepper {
  id: string;
  title: string;
  description?: string;
  href: string | { pathname: string; query?: { [key: string]: string } };
}

interface StepTimelineProps {
  steps: IStepper[];
}

export const StepTimeline = ({ steps }: StepTimelineProps) => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <ol className="relative md:gap-12 flex items-start flex-row gap-4 lg:flex-col overflow-x-auto lg:whitespace-nowrap lg:scrollbar-thin lg:scrollbar-thumb-gray-300">
        {steps?.length === 0 && (
          <main className="h-20 flex items-center justify-center text-gray-500">
            <h1 className="text-sm text-gray-500">No hay pasos para mostrar</h1>
          </main>
        )}
        {steps?.length > 0 && (
          <>
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-start">
                <div
                  className={`relative flex items-center justify-center ${
                    step.description ? "mt-4" : "mt-2"
                  }`}
                >
                  <Link
                    href={step.href}
                    className="w-5 h-5 z-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
                  >
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
                        pathname === step.href
                          ? "bg-primary-500 text-white transform"
                          : "border-2 border-gray-400 bg-white"
                      }`}
                    >
                      {pathname === step.href && (
                        <Check className="w-3 h-3 text-white transition-transform duration-300 ease-in-out" />
                      )}
                    </div>
                  </Link>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute w-0.5 bg-gray-300 left-1/2 transform ${
                        step.description ? "top-8 h-20" : "top-4 h-16"
                      }`}
                    ></div>
                  )}
                </div>
                <div className="ml-6 pt-1">
                  <Link
                    href={step.href}
                    className={`block ${
                      pathname === step.href
                        ? "font-semibold text-primary-700"
                        : "font-medium text-gray-500"
                    }`}
                  >
                    {step.title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </>
        )}
      </ol>
    </div>
  );
};
