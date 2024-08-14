import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/img/pickyy.png";
const navigation = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  function handleLogout() {
    window.localStorage.clear();

    navigate("/login");
  }

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={Logo} className="h-14" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Search
          </NavLink>

          <NavLink
            to={token ? "/profile" : "login"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Profile
          </NavLink>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!token ? (
            <>
              <NavLink
                to="/login"
                className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
              >
                Log in
              </NavLink>
              <Link
                to="/signup"
                className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Sign up
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
              onClick={() => {
                handleLogout();
                window.location.reload();
              }}
            >
              Logout
            </Link>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={Logo} className="h-8 w-auto" />
            </a>
            {!token ? (
              <Link
                onClick={() => setMobileMenuOpen(false)}
                to="/signup"
                className="ml-auto rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Sign up
              </Link>
            ) : null}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/search"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Search
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </Link>
              </div>
              <div className="py-6">
                {!token ? (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                      window.location.reload();
                    }}
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
