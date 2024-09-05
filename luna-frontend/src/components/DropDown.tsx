import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function DropDown() {
  return (
    <Menu as="div" className="relative inline-block w-1/5 text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-5 py-2 text-sm font-semibold text-slate-500 shadow-sm">
          Choose a category
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Account settings
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                Support
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm"
                )}
              >
                License
              </a>
            )}
          </MenuItem>
          <form method="POST" action="#">
            <MenuItem>
              {({ focus }) => (
                <button
                  type="submit"
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default DropDown;
