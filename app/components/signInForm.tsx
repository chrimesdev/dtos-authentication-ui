interface SignInFormProps {
  formAction?: string;
  headingLevel?: 1 | 2 | 3 | 4;
  loginMethod?: ("Smartcard" | "Windows Hello for Business" | "Security key")[];
}

const SignInForm: React.FC<SignInFormProps> = ({
  formAction = "/dashboard",
  headingLevel = 1,
  loginMethod = ["Smartcard", "Windows Hello for Business", "Security key"],
}) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <>
      <form action={formAction} method="post" className="form">
        <div className="nhsuk-form-group">
          <fieldset className="nhsuk-fieldset" aria-describedby="cis2-hint">
            <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--l">
              <HeadingTag className="nhsuk-fieldset__heading">
                Select your login method
              </HeadingTag>
            </legend>
            <div className="nhsuk-hint" id="cis2-hint">
              <p className="nhsuk-u-margin-bottom-2">
                Your choice will be saved as your preferred login method for
                this browser.
              </p>
              <p>
                You may have to repeat this step if you clear your browser's
                cookies.
              </p>
            </div>

            <div className="nhsuk-radios">
              {loginMethod.includes("Smartcard") && (
                <div className="nhsuk-radios__item">
                  <input
                    className="nhsuk-radios__input"
                    id="cis2-1"
                    name="cis2"
                    type="radio"
                    value="smartcard"
                  />
                  <label
                    className="nhsuk-label nhsuk-radios__label"
                    htmlFor="cis2-1"
                  >
                    Smartcard
                  </label>
                </div>
              )}

              {loginMethod.includes("Windows Hello for Business") && (
                <div className="nhsuk-radios__item">
                  <input
                    className="nhsuk-radios__input"
                    id="cis2-2"
                    name="cis2"
                    type="radio"
                    value="windowsHello"
                  />
                  <label
                    className="nhsuk-label nhsuk-radios__label"
                    htmlFor="cis2-2"
                  >
                    Windows Hello for Business
                  </label>
                </div>
              )}

              {loginMethod.includes("Security key") && (
                <div className="nhsuk-radios__item">
                  <input
                    className="nhsuk-radios__input"
                    id="cis2-3"
                    name="cis2"
                    type="radio"
                    value="securityKey"
                  />
                  <label
                    className="nhsuk-label nhsuk-radios__label"
                    htmlFor="cis2-3"
                  >
                    Security key
                  </label>
                </div>
              )}
            </div>
          </fieldset>
        </div>

        <button className="nhsuk-button" type="submit">
          Continue
        </button>
      </form>
    </>
  );
};

export default SignInForm;
