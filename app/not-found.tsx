import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "We cannot find the page you’re looking for - Authentication",
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h1>We cannot find the page you’re looking for</h1>
              <p>
                <Link href="/">Return to the homepage</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
