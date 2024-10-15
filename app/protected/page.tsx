import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { auth } from "@/app/lib/auth";

export const metadata: Metadata = {
  title: "Protected page - NHS England",
};

export default async function Page() {
  const serviceName = "Screening";
  const session = await auth();

  return (
    <>
      <Header serviceName={serviceName} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h1>Protected page</h1>
              <p>Example of an authentication protected page.</p>
              <p>
                You are logged in as {session?.user?.firstName}{" "}
                {session?.user?.lastName} ({session?.user?.sub}) so you can view
                this page.
              </p>
              <p>
                <Link href="/">Go back to the Overview page</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
