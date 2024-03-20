import Link from "next/link";

import AuthButton from "./AuthButton";

export default function Navigation() {
  return (
    <div className="navbar border-b border-gray-300 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <Link href={"/browse"}>Browse</Link>

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-xl">
          Slick
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className={"flex flex-row gap-4"}>
          <Link className={"p-2 "} href={"/"}>
            Home
          </Link>
          <Link className={"p-2"} href={"/browse"}>
            Browse
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <AuthButton />
      </div>
    </div>
  );
}
