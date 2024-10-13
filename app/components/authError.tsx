"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists.
    </p>
  ),
};

export default function AuthError() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <>
      <h1>Something went wrong</h1>
      {errorMap[error] || "Please contact us if this error persists."}
      <p>
        <Link href="/">Go back to the Homepage</Link>
      </p>
    </>
  );
}
