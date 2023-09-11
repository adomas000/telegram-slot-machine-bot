export function validateAndParseFloat(inputString: string) {
  // Regular expression to validate a string with up to two decimal places
  const regex = /^-?\d+(\.\d{1,2})?$/;

  // Check if the input string matches the regular expression
  if (!regex.test(inputString)) {
    return NaN; // Return NaN if the input is not a valid float
  }

  // Parse the validated input string to a float with 2 decimal places
  const floatValue = parseFloat(inputString).toFixed(2);

  return parseFloat(floatValue); // Convert the result back to a float
}