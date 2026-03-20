export function isValidPhone(phone: string): boolean {
  if (/[a-zA-Z]/.test(phone)) {
    return false;
  }
  const numbersOnly = phone.replace(/\D/g, "");
  if (numbersOnly.length < 10 || numbersOnly.length > 11) {
    return false;
  }

  const regexPermitida = /^[0-9()-\s]+$/;

  return regexPermitida.test(phone);
}