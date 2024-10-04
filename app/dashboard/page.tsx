import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Dashboard - Screening",
};

export default function Page() {
  const serviceName = "Screening";
  return (
    <>
      <Header serviceName={serviceName} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h1>Dashboard</h1>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
