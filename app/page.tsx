import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";
import SignIn from "./components/signIn";
import SignInDevelopment from "./components/signInDevelopment";
import { auth } from "./lib/auth";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  if (session?.user) {
    return {
      title: "Overview - NHS England",
    };
  }

  return {
    title: "Log in with your Care Identity account - NHS England",
  };
}

export default async function Home() {
  const serviceName = "Screening";
  const session = await auth();

  return (
    <>
      <Header serviceName={serviceName} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              {session?.user ? (
                <>
                  <h1>Overview</h1>
                  <p>
                    <Link href="/protected">
                      Go to authentication protected page
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <SignIn serviceName={serviceName} />
                  {process.env.NODE_ENV === "development" && (
                    <SignInDevelopment />
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
