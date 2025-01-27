// Declaração de variáveis
let nome = "Artur Gondim";
let dataDeNascimento = '18/09/1972';
let valor = 1800;

// Chamada de função para gerar mensagem ao cliente
const mensagemProCliente = gerarMensagemProCliente(nome, dataDeNascimento, valor);
if (mensagemProCliente) {
    console.log(mensagemProCliente);
}

// Função feita para verificar se os valores são do tipo string e verificar qual mensagem será entregue ao cliente, de acordo com sua idade.
function gerarMensagemProCliente(nome, dataDeNascimentoString, valor) {
    const validarTipoString = isString(nome) && isString(dataDeNascimentoString);

    if (!validarTipoString) {
        console.warn("A idade e a data de nascimento devem ser fornecidas no formato String");
        return null;
    }

    const objetoDataDeNascimento = criarObjetoData(dataDeNascimentoString);
    if (!objetoDataDeNascimento) {
        console.warn("A data informada não é válida");
        return null;
    }

    const idade = gerarIdade(objetoDataDeNascimento);

    if (idade < 16) {
        return       `BEM VINDO! ${nome} 
        
Obrigado pelo seu interesse em se juntar à Autoescola. 
Infelizmente, só aceitamos matrículas de pessoas com 16 anos ou mais. 
Você poderá se juntar a nós a partir do dia ${pegarIdadePermitida(objetoDataDeNascimento)}.`;
    } else if (idade < 18) {
        valor = valor * 0.8;
        return `BEM VINDO! ${nome}
Obrigado pelo seu interesse em se juntar à Autoescola. 
Você poderá fazer uma matrícula antecipada e recebeu um incrível desconto,
deve pagar R$${valor.toFixed(2).replace(".", ",")}. Pode começar as aulas a partir de: ${pegarIdadePermitida(objetoDataDeNascimento)}.`;
    } else if (idade < 40) {
        return`BEM VINDO! ${nome} 
Obrigado pelo seu interesse em se juntar à Autoescola Porto Seguro. 
Você está apto para fazer a matrícula, e deve pagar R$${valor.toFixed(2).replace(".", ",")}. Pode começar as aulas imediatamente.`;
    } else {
        valor = valor * 0.6;
        return `BEM VINDO! ${nome}
Obrigado pelo seu interesse em se juntar à Autoescola Porto Seguro. 
Você está apto para fazer a matrícula, e deve pagar R$${valor.toFixed(2).replace(".", ",")}.
Pode começar as aulas imediatamente.`;
    }
}

function criarObjetoData(dataDeNascimento) {
    const tamanhoData = dataDeNascimento.length;

    if (tamanhoData !== 10) {
        return null;
    }

    const dia = dataDeNascimento.slice(0, 2);
    const mes = dataDeNascimento.slice(3, 5);
    const ano = dataDeNascimento.slice(6);

    const dataValida = (
        elementoValido(dia, 31) &&
        elementoValido(mes, 12) &&
        elementoValido(ano)
    );
    if (!dataValida) {
        return null;
    }

    const objetoData = new Date(ano, Number(mes) - 1, dia);
    return objetoData;
}
// Essa função é reponsavel por calcular a diferença entre a idade necessaria e a data de nascimento do cliente.
function gerarIdade(dataDeNascimento) {
    const hoje = new Date();
    const idadeEmMilisegundos = hoje.getTime() - dataDeNascimento.getTime();
    let idadeEmAnos = millisegundosParaAnos(idadeEmMilisegundos);
    return Math.floor(idadeEmAnos);
}

// Essa Função irá transformar a diferença da data atual com a data de nascimento com o cliente em millisegundos e irá converter em anos.
function millisegundosParaAnos(millisegundos) {
    return millisegundos / (1000 * 60 * 60 * 24 * 365);
}

// Função responsavel por tranformar a data de nascimento no tipo String
function isString(data) {
    return typeof data === 'string';
}

// Essa função é responsavel por formatar a data, de forma que será visivel ao cliente
function dataFormatada(objetoData) {
    const year = String(objetoData.getFullYear());
    const month = String(objetoData.getMonth() + 1);
    const day = String(objetoData.getDate());

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year.padStart(4, '0')}`;
}
// Essa função irá verificar se a data formatada atende os requisitos para inscrição.
function pegarIdadePermitida(dataDeNascimento) {
    const dataPermitida = new Date(dataDeNascimento);
    dataPermitida.setFullYear(dataDeNascimento.getFullYear() + 18);
    return dataFormatada(dataPermitida);
}
// Essa função irá verficar se os números fornecidos pelo cliente são numeros naturais.
function elementoValido(elemento, maxValue = Infinity) {
    const valorNumerico = Number(elemento);
    return !isNaN(valorNumerico) && valorNumerico > 0 && valorNumerico <= maxValue;
}
