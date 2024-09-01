export default function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  let primeiroDigitoVerificador = (soma * 10) % 11;
  if (primeiroDigitoVerificador === 10 || primeiroDigitoVerificador === 11) {
    primeiroDigitoVerificador = 0;
  }
  if (primeiroDigitoVerificador !== parseInt(cpf[9])) {
    return false;
  }

  // Segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  let segundoDigitoVerificador = (soma * 10) % 11;
  if (segundoDigitoVerificador === 10 || segundoDigitoVerificador === 11) {
    segundoDigitoVerificador = 0;
  }
  if (segundoDigitoVerificador !== parseInt(cpf[10])) {
    return false;
  }

  return true;
}
