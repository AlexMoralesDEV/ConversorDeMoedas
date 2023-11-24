let token = ''; // fazer login no site: https://api.invertexto.com/api-conversor-moedas
let btnEnviar = document.querySelector('#btnEnviar');
let paisesEMoedas = [
    { id: 0, moeda: "Real", abv: "BRL", simb: "R$", pais: "Brasil", plural: "Reais" },
    { id: 1, moeda: "Dólar Americano", abv: "USD", simb: "$", pais: "Estados Unidos", plural: "Dólares Americanos" },
    { id: 2, moeda: "Dólar Canadense", abv: "CAD", simb: "CA$", pais: "Canadá", plural: "Dólares Canadenses" },
    { id: 3, moeda: "Libra Esterlina", abv: "GBP", simb: "£", pais: "Reino Unido", plural: "Libras Esterlinas" },
    { id: 4, moeda: "Iene Japonês", abv: "JPY", simb: "¥", pais: "Japão", plural: "Ienes Japoneses" },
    { id: 5, moeda: "Dólar Australiano", abv: "AUD", simb: "A$", pais: "Austrália", plural: "Dólares Australianos" },
    { id: 6, moeda: "Euro", abv: "EUR", simb: "€", pais: "Alemanha", plural: "Euros" },
    { id: 7, moeda: "Renminbi Chinês", abv: "CNY", simb: "¥", pais: "China", plural: "Renminbis Chineses" },
    { id: 8, moeda: "Rupia Indiana", abv: "INR", simb: "₹", pais: "Índia", plural: "Rupias Indianas" },
    { id: 9, moeda: "Peso Mexicano", abv: "MXN", simb: "$", pais: "México", plural: "Pesos Mexicanos" }
];

btnEnviar.addEventListener('click', async (e) => {
    let moeda = encontrarMoeda();

    if(!moeda) return;
    
        let dados = await request(moeda);
        
        
        calcular(moeda, dados);
   
});

async function request(moeda) {
    let urlAPI = `https://api.invertexto.com/v1/currency/${moeda}?token=${token}`;
    console.log(urlAPI);
    let resposta = await fetch(urlAPI);

    if(resposta.status !== 200) return;

    let dados = await resposta.json();

    return dados;
}

let calcular = (moeda, dados) => {
    let primeiroValor = document.querySelector('#primeiroValor').value;
    let moedaPlural = document.querySelector('#moedaPlural');
    let resposta = document.querySelector('#resultado');
    let resultado = (Number(primeiroValor) * dados[moeda].price).toFixed(2);
    resposta.innerHTML = buscarSimbolo() + ' ' + resultado;
    moedaPlural.innerHTML = buscarPlural();
}

function adicionarMoedas() {
    let moeda1 = document.querySelector('#moeda1');
    let moeda2 = document.querySelector('#moeda2');

    paisesEMoedas.forEach(x => {
        let option = document.createElement('option');
        option.setAttribute('class', 'opcoes');
        option.innerHTML = x.moeda;
        moeda1.appendChild(option);
    });

    paisesEMoedas.forEach(x => {
        let option = document.createElement('option')
        option.setAttribute('class', 'opcoes');
        option.innerHTML = x.moeda;
        moeda2.appendChild(option);
    });
}

adicionarMoedas();

function buscarSimbolo() {
    let moedaSelecionada2 = moeda2.selectedIndex;

    resultadoMoeda2 = paisesEMoedas.find(valor => {
        return valor.id === moedaSelecionada2;
    });

    let sinal = resultadoMoeda2.simb;

    return sinal;
}

function buscarPlural() {
    let moedaSelecionada2 = moeda2.selectedIndex;

    resultadoMoeda2 = paisesEMoedas.find(valor => {
        return valor.id === moedaSelecionada2;
    });

    let plural = resultadoMoeda2.plural;

    return plural;
}

function encontrarMoeda() {
    let moedaSelecionada1 = moeda1.selectedIndex;
    let moedaSelecionada2 = moeda2.selectedIndex;

    if(moedaSelecionada1 === moedaSelecionada2) return;

    resultadoMoeda1 = paisesEMoedas.find(valor => {
        return valor.id === moedaSelecionada1;
    });

    resultadoMoeda2 = paisesEMoedas.find(valor => {
        return valor.id === moedaSelecionada2;
    });

    let sinal = resultadoMoeda2.simb;

    resultadoMoeda1 = resultadoMoeda1.abv;
    resultadoMoeda2 = resultadoMoeda2.abv;

    return `${resultadoMoeda1}_${resultadoMoeda2}`;
}
