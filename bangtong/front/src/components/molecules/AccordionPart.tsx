import React from "react";
import { AccordionItem as Item } from "@szhsin/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// AccordionItemProps 타입 정의
interface AccordionItemProps {
  header: string;
  initialEntered?: boolean;
  children: React.ReactNode;
}

const AccordionPart: React.FC<AccordionItemProps> = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <ChevronDownIcon
          className={`ml-auto transition-transform duration-200 ease-out w-4 h-4 ${
            isEnter ? "rotate-180" : ""
          }`}
        />
      </>
    )}
    className="border-b"
    style={{ width: "80vw" }}
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-slate-100 ${
          isEnter ? "bg-slate-200" : ""
        }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default AccordionPart;
