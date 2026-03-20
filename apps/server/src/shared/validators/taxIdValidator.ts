export function isValidTaxId(taxId: string): boolean {
  // 1. Limpa caracteres não numéricos
  const cleanTaxId = taxId.replace(/\D/g, '');

    // 2. Valida tamanho e evita números repetidos óbvios (ex: 111.111.111-11)
    if (cleanTaxId.length !== 11 || /^(\d)\1+$/.test(cleanTaxId)) {
      return false;
    }

    const digits = cleanTaxId.split('').map(Number);

    // 3. Cálculo do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    let firstChecker = (sum * 10) % 11;
    if (firstChecker === 10 || firstChecker === 11) firstChecker = 0;

    if (firstChecker !== digits[9]) return false;

    // 4. Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    let secondChecker = (sum * 10) % 11;
    if (secondChecker === 10 || secondChecker === 11) secondChecker = 0;

    return secondChecker === digits[10];
  }