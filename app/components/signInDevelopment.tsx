import { signIn } from "@/app/lib/auth";

export default function SignInDevelopment() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          className={`nhsuk-button nhsuk-u-margin-bottom-4`}
          data-module="nhsuk-button"
          type="submit"
        >
          Log in as a development user (testing only)
        </button>
      </form>
    </>
  );
}
