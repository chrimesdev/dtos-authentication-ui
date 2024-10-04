import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import SignInForm from "../components/signInForm";

export const metadata: Metadata = {
  title: "Sign in - Authentication",
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
              <SignInForm></SignInForm>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
