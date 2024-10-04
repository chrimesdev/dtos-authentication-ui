import { formatNhsNumber, removeSpacesFromNhsNumber } from "./utils";

describe("formatNhsNumber", () => {
  it("should format the NHS number as XXX XXX XXXX", () => {
    const input = "1234567890";
    const expectedOutput = "123 456 7890";
    expect(formatNhsNumber(input)).toBe(expectedOutput);
  });

  it("should return the input if it is not a valid NHS number", () => {
    const input = "12345";
    const expectedOutput = "12345";
    expect(formatNhsNumber(input)).toBe(expectedOutput);
  });
});

describe("removeSpacesFromNhsNumber", () => {
  it("should remove spaces from the NHS number", () => {
    const input = "123 456 7890";
    const expectedOutput = "1234567890";
    expect(removeSpacesFromNhsNumber(input)).toBe(expectedOutput);
  });

  it("should return the input if there are no spaces", () => {
    const input = "1234567890";
    const expectedOutput = "1234567890";
    expect(removeSpacesFromNhsNumber(input)).toBe(expectedOutput);
  });
});
