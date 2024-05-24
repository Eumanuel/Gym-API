function divideUmPor89(casasDecimais) {
  let dividendo = 1n; // BigInt para representar 1
  let divisor = 89n; // BigInt para representar 89
  let resultado = '';

  for (let i = 0; i <= casasDecimais; i++) {
    dividendo *= 10n;
    let quociente = dividendo / divisor;
    resultado += String(quociente);

    dividendo %= divisor;
  }

  return resultado.slice(0, 1) + '.' + resultado.slice(1);
}

// Exemplo de uso para 10 mil casas decimais
const casasDecimais = 250;
const resultado = divideUmPor89(casasDecimais);
console.log(`Resultado: ${resultado}`);
