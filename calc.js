
function mostrarCalc(tipo) {
  const area = document.getElementById("calculadora");

  if (tipo === "idade") {
    area.innerHTML = `
      <div class="card">
        <h2>Aposentadoria por Idade</h2>
        <input type="number" id="idade" placeholder="Sua idade"><br><br>
        <button onclick="calcularIdade()">Calcular</button>
        <p id="resultado"></p>
      </div>
    `;
  }

  if (tipo === "tempo") {
    area.innerHTML = `
      <div class="card">
        <h2>Tempo de Contribuição</h2>
        <input type="number" id="anos" placeholder="Anos contribuídos"><br><br>
        <button onclick="calcularTempo()">Calcular</button>
        <p id="resultado"></p>
      </div>
    `;
  }

  if (tipo === "beneficio") {
    area.innerHTML = `
      <div class="card">
        <h2>Valor do Benefício</h2>
        <input type="number" id="salario" placeholder="Salário médio"><br><br>
        <button onclick="calcularBeneficio()">Calcular</button>
        <p id="resultado"></p>
      </div>
    `;
  }

  if (tipo === "juros") {
    area.innerHTML = `
      <div class="card">
        <h2>Juros Simples e Compostos</h2>

        <input type="number" id="capital" placeholder="Capital inicial"><br><br>
        <input type="number" id="taxa" placeholder="Taxa (%)"><br><br>
        <input type="number" id="tempo" placeholder="Tempo"><br><br>

        <button onclick="calcularJurosSimples()">Juros Simples</button>
        <button onclick="calcularJurosCompostos()">Juros Compostos</button>

        <p id="resultado"></p>
      </div>
    `;
  }

  if (tipo === "amortizacao") {
    area.innerHTML = `
      <div class="card">
        <h2>Calculadora de Amortização</h2>

        <label>Valor do Empréstimo:</label><br>
        <input type="number" id="valor" placeholder="Ex: 10000"><br><br>

        <label>Taxa de Juros (% ao mês):</label><br>
        <input type="number" id="juros" placeholder="Ex: 2"><br><br>

        <label>Parcelas:</label><br>
        <input type="number" id="parcelas" placeholder="Ex: 12"><br><br>

        <label>Tipo:</label><br>
        <select id="tipoAmortizacao">
          <option value="price">Price</option>
          <option value="sac">SAC</option>
        </select><br><br>

        <button onclick="calcularAmortizacao()">Calcular</button>

        <p id="resultado"></p>
      </div>
    `;
  }

  if (tipo === "pontos") {
    area.innerHTML = `
      <div class="card">
        <h2>Cálculo de Pontos (Aposentadoria)</h2>

        <select id="sexo">
          <option value="homem">Homem</option>
          <option value="mulher">Mulher</option>
        </select><br><br>

        <input type="number" id="idadePontos" placeholder="Sua idade"><br><br>
        <input type="number" id="tempoPontos" placeholder="Tempo de contribuição (anos)"><br><br>

        <button onclick="calcularPontos()">Calcular</button>

        <p id="resultado"></p>
      </div>
    `;
  }

  if (tipo === "Qsalario") {
    area.innerHTML = `
      <div class="card">
        <h2>Qualidade de Salario</h2>

        <input type="month" id="mesAno"><br><br>
        <input type="number" id="valorHora" placeholder="Valor da hora"><br><br>
        <input type="number" id="horasMes" placeholder="Horas trabalhadas no mês"><br><br>

        <button onclick="calcularPontos()">Calcular</button>
        <button onclick="repetirCalculo()">Repetir último X vezes</button>

        <br><br>
        <input type="number" id="vezes" placeholder="Quantas vezes repetir"><br><br>

        <p id="resultado"></p>
      </div>
    `;
  }
}

function calcularIdade() {
  const idade = document.getElementById("idade").value;
  const res = document.getElementById("resultado");

  if (idade >= 65) {
    res.innerText = "Você já pode se aposentar!";
  } else {
    res.innerText = "Ainda não atingiu a idade mínima.";
  }
}

function calcularTempo() {
  const anos = document.getElementById("anos").value;
  const res = document.getElementById("resultado");

  if (anos >= 35) {
    res.innerText = "Tempo suficiente para aposentadoria!";
  } else {
    res.innerText = "Ainda falta tempo de contribuição.";
  }
}

function calcularBeneficio() {
  const salario = document.getElementById("salario").value;
  const res = document.getElementById("resultado");

  const beneficio = salario * 0.6;
  res.innerText = "Valor estimado: R$ " + beneficio.toFixed(2);
}

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  const msg = document.getElementById("loginMsg");

  if (user === "admin" && pass === "123") {
    msg.innerText = "Login realizado com sucesso!";
  } else {
    msg.innerText = "Usuário ou senha incorretos.";
  }
}

function calcularJurosSimples() {
  const capital = parseFloat(document.getElementById("capital").value);
  const taxa = parseFloat(document.getElementById("taxa").value) / 100;
  const tempo = parseFloat(document.getElementById("tempo").value);
  const res = document.getElementById("resultado");

  const juros = capital * taxa * tempo;
  const total = capital + juros;

  res.innerText = `Total: R$ ${total.toFixed(2)} (Juros: R$ ${juros.toFixed(2)})`;
}

function calcularJurosCompostos() {
  const capital = parseFloat(document.getElementById("capital").value);
  const taxa = parseFloat(document.getElementById("taxa").value) / 100;
  const tempo = parseFloat(document.getElementById("tempo").value);
  const res = document.getElementById("resultado");

  const total = capital * Math.pow((1 + taxa), tempo);
  const juros = total - capital;

  res.innerText = `Total: R$ ${total.toFixed(2)} (Juros: R$ ${juros.toFixed(2)})`;
}

function calcularAmortizacao() {
  const valor = parseFloat(document.getElementById("valor").value);
  const juros = parseFloat(document.getElementById("juros").value) / 100;
  const parcelas = parseInt(document.getElementById("parcelas").value);
  const tipo = document.getElementById("tipoAmortizacao").value;
  const res = document.getElementById("resultado");

  let saldo = valor;
  let resultadoHTML = "";

  if (tipo === "price") {
    const parcela = valor * (juros * Math.pow(1 + juros, parcelas)) / (Math.pow(1 + juros, parcelas) - 1);

    for (let i = 1; i <= parcelas; i++) {
      const jurosParcela = saldo * juros;
      const amortizacao = parcela - jurosParcela;
      saldo -= amortizacao;

      resultadoHTML += `
        <p>
          Parcela ${i}: <br>
          Juros: R$ ${jurosParcela.toFixed(2)} <br>
          Amortização: R$ ${amortizacao.toFixed(2)} <br>
          Saldo Devedor: R$ ${saldo.toFixed(2)}
        </p>
        <hr>
      `;
    }
  }
}

function calcularPontos() {
  const idade = Number(document.getElementById("idadePontos").value);
  const tempo = Number(document.getElementById("tempoPontos").value);
  const sexo = document.getElementById("sexo").value;
  const res = document.getElementById("resultado");

  const pontos = idade + tempo;

  let minimo;

  if (sexo === "homem") {
    minimo = 100;
  } else {
    minimo = 90;
  }

  if (pontos >= minimo) {
    res.innerText = `Você tem ${pontos} pontos. Já pode se aposentar!`;
  } else {
    const falta = minimo - pontos;
    res.innerText = `Você tem ${pontos} pontos. Faltam ${falta} pontos para se aposentar.`;
  }
}

const dadosINSS = {
  2026: { salarioMin: 1621, teto: 8475.55, moeda: "R$" },
  2025: { salarioMin: 1518, teto: 8157.41, moeda: "R$" },
  2024: { salarioMin: 1412, teto: 7786.02, moeda: "R$" },
  2023: { salarioMin: 1320, teto: 7507.49, moeda: "R$" },
  2022: { salarioMin: 1212, teto: 7087.22, moeda: "R$" },
  2021: { salarioMin: 1100, teto: 6433.57, moeda: "R$" },
  2020: { salarioMin: 1045, teto: 6101.06, moeda: "R$" },
  2019: { salarioMin: 998, teto: 5839.45, moeda: "R$" },
  2018: { salarioMin: 954, teto: 5645.80, moeda: "R$" },
  2017: { salarioMin: 937, teto: 5531.31, moeda: "R$" },
  2016: { salarioMin: 880, teto: 5189.82, moeda: "R$" },
  2015: { salarioMin: 788, teto: 4663.75, moeda: "R$" },
  2014: { salarioMin: 724, teto: 4390.24, moeda: "R$" },
  2013: { salarioMin: 678, teto: 4159.00, moeda: "R$" },
  2012: { salarioMin: 622, teto: 3916.20, moeda: "R$" },
  2011: { salarioMin: 545, teto: 3691.74, moeda: "R$" },
  2010: { salarioMin: 510, teto: 3467.40, moeda: "R$" },
  2009: { salarioMin: 465, teto: 3218.90, moeda: "R$" },
  2008: { salarioMin: 415, teto: 3038.99, moeda: "R$" },
  2007: { salarioMin: 380, teto: 2894.28, moeda: "R$" },
  2006: { salarioMin: 350, teto: 2801.82, moeda: "R$" },
  2005: { salarioMin: 300, teto: 2668.15, moeda: "R$" },
  2004: { salarioMin: 260, teto: 2508.72, moeda: "R$" },
  2003: { salarioMin: 240, teto: 2400.00, moeda: "R$" },
  2002: { salarioMin: 200, teto: 1869.34, moeda: "R$" },
  2001: { salarioMin: 180, teto: 1430.00, moeda: "R$" },
  2000: { salarioMin: 151, teto: 1255.32, moeda: "R$" },
  1999: { salarioMin: 136, teto: 1200.00, moeda: "R$" },
  1998: { salarioMin: 130, teto: 1081.50, moeda: "R$" },
  1997: { salarioMin: 120, teto: 1031.87, moeda: "R$" },
  1996: { salarioMin: 112, teto: 957.56, moeda: "R$" },
  1995: { salarioMin: 100, teto: 832.66, moeda: "R$" },
  1994: { salarioMin: 64.79, teto: 582.86, moeda: "R$" },
  1993: { salarioMin: 1200000, teto: 10800000, moeda: "Cr$" },
  1992: { salarioMin: 70000, teto: 630000, moeda: "Cr$" },
  1991: { salarioMin: 50000, teto: 450000, moeda: "Cr$" },
  1990: { salarioMin: 8590000, teto: 77310000, moeda: "NCz$" },
  1989: { salarioMin: 1600000, teto: 14400000, moeda: "NCz$" },
  1988: { salarioMin: 1200000, teto: 10800000, moeda: "NCz$" },
  1987: { salarioMin: 64800, teto: 583200, moeda: "NCz$" },
  1986: { salarioMin: 26400, teto: 237600, moeda: "NCz$" },
  1985: { salarioMin: 13000, teto: 117000, moeda: "Cr$" },
  1984: { salarioMin: 16400, teto: 147600, moeda: "Cr$" },
  1983: { salarioMin: 9700, teto: 87300, moeda: "Cr$" },
  1982: { salarioMin: 8000, teto: 72000, moeda: "Cr$" },
  1981: { salarioMin: 2500, teto: 22500, moeda: "Cr$" },
  1980: { salarioMin: 1500, teto: 13500, moeda: "Cr$" },
  1979: { salarioMin: 840, teto: 7560, moeda: "Cr$" },
  1978: { salarioMin: 630, teto: 5670, moeda: "Cr$" },
  1977: { salarioMin: 470, teto: 4230, moeda: "Cr$" },
  1976: { salarioMin: 380, teto: 3420, moeda: "Cr$" },
  1975: { salarioMin: 420, teto: 3780, moeda: "Cr$" },
  1974: { salarioMin: 240, teto: 2160, moeda: "Cr$" },
  1973: { salarioMin: 190, teto: 1710, moeda: "Cr$" },
  1972: { salarioMin: 150, teto: 1350, moeda: "Cr$" },
  1971: { salarioMin: 135, teto: 1215, moeda: "Cr$" },
  1970: { salarioMin: 120, teto: 1080, moeda: "Cr$" },
  1969: { salarioMin: 105, teto: 945, moeda: "Cr$" },
  1968: { salarioMin: 90, teto: 810, moeda: "Cr$" },
  1967: { salarioMin: 60, teto: 540, moeda: "Cr$" },
  1966: { salarioMin: 84, teto: 756, moeda: "Cr$" },
  1965: { salarioMin: 66, teto: 594, moeda: "Cr$" }
};

function calcularPontos() {
  const mesAno = document.getElementById("mesAno").value;
  const valorHora = parseFloat(document.getElementById("valorHora").value);
  const horasMes = parseFloat(document.getElementById("horasMes").value);
  const res = document.getElementById("resultado");

  if (!mesAno || !valorHora || !horasMes) {
    res.innerText = "Preencha todos os campos!";
    return;
  }

  const ano = mesAno.split("-")[0];
  const dados = dadosINSS[ano];

  if (!dados) {
    res.innerText = "Dados do ano não disponíveis.";
    return;
  }

  const valorMensal = valorHora * horasMes;

  res.innerHTML = `
    Valor Mensal: ${dados.moeda} ${valorMensal.toFixed(2)} <br>
    Salário Mínimo: ${dados.moeda} ${dados.salarioMin} <br>
    Teto INSS: ${dados.moeda} ${dados.teto}
  `;
}

function repetirCalculo() {
  const vezes = parseInt(document.getElementById("vezes").value);
  const mesAnoInput = document.getElementById("mesAno");
  const res = document.getElementById("resultado");

  if (!vezes || vezes <= 0) {
    res.innerText = "Informe um número válido de repetições.";
    return;
  }

  let [ano, mes] = mesAnoInput.value.split("-").map(Number);

  let resultadoFinal = "";

  for (let i = 0; i < vezes; i++) {
    // Avança o mês
    mes++;
    if (mes > 12) {
      mes = 1;
      ano++;
    }

    const novoMes = `${ano}-${String(mes).padStart(2, "0")}`;
    mesAnoInput.value = novoMes;

    const valorHora = parseFloat(document.getElementById("valorHora").value);
    const horasMes = parseFloat(document.getElementById("horasMes").value);

    const dados = dadosINSS[ano];

    if (!dados) continue;

    const valorMensal = valorHora * horasMes;

    resultadoFinal += `
      ${novoMes} → ${dados.moeda} ${valorMensal.toFixed(2)}<br>
    `;
  }

  res.innerHTML = resultadoFinal;
}