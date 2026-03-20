import { isValidLength } from "./textValidator";

export function isValidName(name: string): boolean {
  const regexApenasLetras = /[^a-zA-ZÀ-ÿ\s]/;
  if (isValidLength(name) || regexApenasLetras.test(name)) {
    return false;
  }
  return true;
}
