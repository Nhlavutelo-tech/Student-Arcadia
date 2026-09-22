import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logo from "@/assets/whatsapp-image-2025-12-06-at-07.15.26_a3dc6be8.jpg.asset.json";
import { Button, ButtonLink } from "@/components/ui/button";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About Us" },
  { to: "/services" as const, label: "Services" },
  { to: "/properties-for-sale" as const, label: "Properties for Sale" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="relative z-50 px-4 pt-4 sm:px-8 sm:pt-6">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6" aria-label="Main navigation">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <img src={logo.url} alt="Student Arcadia" className="size-10 shrink-0 rounded-[10px] object-cover" />
            <span className="truncate font-display text-base font-semibold text-ink sm:text-lg">Student Arcadia</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <ButtonLink to="/contact">Book a viewing <ArrowUpRight className="size-4" /></ButtonLink>
          </div>
          <Button variant="outline" size="icon" className="sm:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>
        {open && (
          <div className="glass animate-scale-in mx-auto mt-2 max-w-7xl rounded-2xl p-4 md:hidden">
            <div className="flex flex-col">
              {links.map((link) => <Link key={link.to} to={link.to} className="border-b border-primary/10 px-2 py-3 text-sm font-medium text-primary" onClick={() => setOpen(false)}>{link.label}</Link>)}
              <Link to="/contact" className="mt-3 rounded-[10px] bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground" onClick={() => setOpen(false)}>Contact us</Link>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-primary/10 pt-7 sm:flex-row sm:items-center">
          <Link to="/" className="flex items-center gap-2.5"><img src={logo.url} alt="" className="size-9 rounded-[9px] object-cover" /><span className="font-display text-sm font-semibold text-ink">Student Arcadia</span></Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {links.map((link) => <Link key={link.to} to={link.to} className="transition-colors hover:text-ink">{link.label}</Link>)}
            <Link to="/contact" className="transition-colors hover:text-ink">Contact</Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Accredited student accommodation support. NSFAS-focused. © 2026 Student Arcadia.</p>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
      <p className="reveal text-xs font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h1 className="reveal reveal-1 mt-4 max-w-[18ch] text-balance font-display text-4xl font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">{title}</h1>
      <div className="reveal reveal-2 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}