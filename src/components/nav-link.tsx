import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { navButtonClass } from "./nav-links";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  target?: string;
}

export function NavLink({ to, children, target }: NavLinkProps) {
  return (
    <Link to={to} target={target}>
      <button className={navButtonClass}>{children}</button>
    </Link>
  );
}
