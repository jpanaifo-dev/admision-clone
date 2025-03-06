"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ExternalLinkProps {
  href: string;
  label?: string;
  blank?: boolean;
}

export const ExternalLinkButton = ({
  href,
  label,
  blank,
}: ExternalLinkProps) => {
  return (
    <>
      {blank ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          {label || "Actualizar información"}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      ) : (
        <Link href={href}>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            {label || "Actualizar información"}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </>
  );
};
