import { ArrowUpRight } from "lucide-react";

export function TopBar() {
  return (
    <header className="site-header">
      <span className="header-location">Jakarta, Indonesia</span>
      <a className="header-contact" href="mailto:patricianessa10123@gmail.com">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
    </header>
  );
}
