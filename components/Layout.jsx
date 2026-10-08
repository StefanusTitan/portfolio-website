import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
