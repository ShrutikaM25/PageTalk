import React, { ReactNode } from "react";
import { Card } from "@nextui-org/react";

interface CardHolderProps {
  children: ReactNode;
  classname?: string;
}

const CardHolder: React.FC<CardHolderProps> = ({ children, classname: className="p-5" }) => {
  return (
    <Card className={className}>
      {children}
    </Card>
  );
}

export default CardHolder;
