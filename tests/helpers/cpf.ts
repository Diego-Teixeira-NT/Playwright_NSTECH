function calcularDigito(digitos: number[]): number {
  let soma = 0;
  let peso = digitos.length + 1;

  for (const digito of digitos) {
    soma += digito * peso;
    peso--;
  }

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function gerarCpfValido(): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const digito1 = calcularDigito(base);
  const digito2 = calcularDigito([...base, digito1]);

  const cpf = [...base, digito1, digito2];

  return `${cpf.slice(0, 3).join('')}.${cpf.slice(3, 6).join('')}.${cpf.slice(6, 9).join('')}-${cpf.slice(9).join('')}`;
}
