import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function DropDown() {
  const [callCompany, setCallCompany] = useState<string>("통신사");
  const callCompanyList: Array<string> = ["SKT", "KT", "LG U+", "알뜰폰"];
  const handleSetCallCompany = (item: string) => {
    setCallCompany(item);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex text-nowrap w-20 justify-center rounded-full bg-white px-3 py-1 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {callCompany}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 top-5 z-10 mt-2 w-26 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {callCompanyList.map((item) => (
            <MenuItem key={item}>
              <button
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-20"
                onClick={(e) => {
                  handleSetCallCompany(item);
                }}
              >
                {item}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}