// components/ui/form-card.tsx
"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface FormCardProps {
  title: string;
  children: ReactNode;
  className?: string; // optional extra styling
}

export function FormCard({ title, children, className = "" }: FormCardProps) {
  return (
    <Card className={`mx-auto border border-gray-200 shadow-md rounded-2xl ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent >{children}</CardContent>
    </Card>
  );
}
