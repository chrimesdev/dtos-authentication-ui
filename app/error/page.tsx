import type { Metadata } from "next";
import AuthError from "@/app/components/authError";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Something went wrong - NHS England",
};

export default function AuthErrorPage() {
  const serviceName = process.env.SERVICE_NAME;

  return (
    <>
      <Header serviceName={serviceName} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <AuthError />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
