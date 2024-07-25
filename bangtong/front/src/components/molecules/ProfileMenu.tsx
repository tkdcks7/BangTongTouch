import React from "react";
import { Accordion } from "@szhsin/react-accordion";
import AccordionPart from "../molecules/AccordionPart";

const ProfileMenu: React.FC = () => {
  return (
    <div className="mx-2 my-4 border-t">
      <Accordion transition transitionTimeout={200}>
        <AccordionPart header="What is Lorem Ipsum?">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionPart>

        <AccordionPart header="Where does it come from?">
          Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
          erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae.
        </AccordionPart>

        <AccordionPart header="Why do we use it?">
          Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
          Fusce vulputate purus sed tempus feugiat.
        </AccordionPart>
      </Accordion>
    </div>
  );
};

export default ProfileMenu;