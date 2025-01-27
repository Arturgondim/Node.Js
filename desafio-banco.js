const cliente = {
    nome: 'Artur Felipe de Azevedo Gondim',
    dataNascimento: '18/09/2004',
    documento: {
        tipo: 'RG',
        numero: 2024660436,
    },
    endereco: {
        cep: 45028425,
        estado: 'BA',
        cidade: 'Vitória da Conquista',
        bairro: 'Candeias',
        logradouro: 'Rua **********',
        numero: 000,
        complemento: 'Ap00',
    },
    tipo: 'Brasileiro',
    rendaMensal: 1500,
    ativo: false,

    validarDados() {
        const maiorDeIdade = verificarSeMaiorDeIdade(this.dataNascimento)
        const tipoDocumentoValido = validarTipoDocumento(this.documento.tipo)
        const numeroDocumentoValido = validarNumeroDocumento(this.documento.numero)

        const dadosValidos = maiorDeIdade && tipoDocumentoValido && numeroDocumentoValido
        if (dadosValidos) {
            this.ativarConta()
        }
    },

    ativarConta() {
        this.ativo = true
        this.numeroDaConta = gerarNumeroDaConta()
        this.saldo = 0
        this.tipoCartao = obterTipoDoCartao(this.rendaMensal)
    },

    adicionarSaldo(valor, moeda) {
        if (!this.ativo) {
            console.error('Para adicionar saldo sua conta deve estar ativa.')
            return
        }
        if (typeof valor !== 'number' || valor <= 0) {
            console.error('O valor deve ser um número positivo.')
            return
        }
        if (moeda === 'BRL') {
            this.saldo += valor
            return
        }
        if (moeda === 'USD' || moeda === 'EUR') {
            this.saldo += converterValorParaReal(valor, moeda)
            return
        }

        console.error('As únicas moedas aceitas são BRL, USD e EUR.')
    },

    removerSaldo(valor) {
        if (!this.ativo) {
            console.error('Para realizar transações a conta do cliente precisa estar ativa.')
            return
        }
        if (valor > this.saldo) {
            console.error(`Não é possível realizar saques maiores que ${this.saldo} reais.`)
            return
        }
        this.saldo -= valor
    },
}

// Funções auxiliares corrigidas:
function verificarSeMaiorDeIdade(dataNascimento) {
    const idade = obterIdade(dataNascimento)
    return idade >= 18
}

function obterIdade(stringDataDeNascimento) {
    const [diaNascimento, mesNascimento, anoNascimento] = stringDataDeNascimento.split('/')
    const objetoDataDeNascimento = new Date(anoNascimento, Number(mesNascimento) - 1, diaNascimento)
    const idadeEmMilisegundos = new Date().getTime() - objetoDataDeNascimento.getTime()
    return milisegundosParaAnos(idadeEmMilisegundos)
}

function milisegundosParaAnos(milisegundos) {
    return milisegundos / (1000 * 60 * 60 * 24 * 365)
}

function validarTipoDocumento(tipoDocumento) {
    const tiposAceitos = ['RG', 'CNH', 'PASSAPORTE']
    return tiposAceitos.some(tipoAceito => tipoDocumento.toUpperCase() === tipoAceito)
}

function validarNumeroDocumento(numeroDocumento) {
    if (!numeroDocumento || typeof numeroDocumento !== 'number') {
        return false
    }
    return String(numeroDocumento).length >= 8
}

function gerarNumeroDaConta() {
    return Math.floor(Math.random() * 1000000)
}

function obterTipoDoCartao(rendaMensal) {
    return rendaMensal > 10000 ? 'BLACK' : 'STANDARD'
}

function converterValorParaReal(valor, moeda) {
    const cotacao = {
        EUR: 6.45,
        USD: 6.15,
    }
    if (!cotacao[moeda]) {
        console.error('Moeda inválida. Use apenas BRL, USD ou EUR.')
        return 0
    }
    return Number((valor * cotacao[moeda]).toFixed(2))
}

// Testando o código corrigido:
cliente.validarDados()
console.log(cliente.ativo)

cliente.adicionarSaldo(20, 'EUR')
console.log(cliente.saldo)

cliente.removerSaldo(100)
console.log(cliente.saldo)
