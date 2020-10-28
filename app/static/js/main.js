/*
Criado em 09/2020
@Autor: Paulo https://github.com/alpdias
*/


// JS

function adicionar() {

    let produto = document.querySelector('#produto').textContent;
    let preco = document.querySelector('#preco').textContent;
    let disponivel = document.querySelector('#dispo').textContent;
    let qtd = document.querySelector('#qtd').value;

    if (parseInt(disponivel) == 0) {

        window.alert('Produto Esgotado!');

    } else if (qtd > parseFloat(disponivel)) {

        window.alert('Quantidade Insuficiente!')

    } else {

        let compra = {
            nome: produto,
            valor: preco,
            quantidade: qtd,
        };
        
        if (localStorage.getItem('carrinho') === null) {

            let itens = [];
            itens.push(compra);

            localStorage.setItem('carrinho', JSON.stringify(itens));

        } else {

            let itens = JSON.parse(localStorage.getItem('carrinho'));
            itens.push(compra);
            
            localStorage.setItem('carrinho', JSON.stringify(itens));

        };

    };

};

function compras() {
    
    if (localStorage.getItem('carrinho') === null) {} else {

        let itens = JSON.parse(localStorage.getItem('carrinho'));

        for (let i = 0; i < itens.length; i++) { 

            let nome =  itens[i].nome;
            let preco = itens[i].valor;
            let qtd = itens[i].quantidade;

            let total = (parseFloat(preco.replace(',','.')) * parseInt(qtd))

            document.querySelector('#resultado').innerHTML += `\
                <tr>\
                    <td style="word-wrap: break-word;">` + nome + `</td>\
                    <td style="word-wrap: break-word;">` + preco + `</td>\
                    <td style="word-wrap: break-word;">` + parseInt(qtd) + `</td>\
                    <td style="word-wrap: break-word;">` + total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + `</td>\
                    <td style="word-wrap: break-word;"><a href="/cart"><span onclick="removerItem(\'` + nome + `\')" class="botao-editar"><i class="fas fa-minus-circle"></i><span></a></td>\
                </tr>`;

        };
        
    };

};

function fecharVenda() {

    confirmarVenda();

    let itens = JSON.parse(localStorage.getItem('carrinho'));

    var soma = 0;

    for (let i = 0; i < itens.length; i++) { 
        
        let preco = itens[i].valor;
        let qtd = itens[i].quantidade;

        let total = (parseFloat(preco.replace(',','.')) * parseInt(qtd));

        soma += total;

    };

    let resultadoVenda = {
        valor: soma,
    };

    if (localStorage.getItem('resultadoVenda') === null) {

        let resultadoVendas = [];
        resultadoVendas.push(resultadoVenda);

        localStorage.setItem('resultadoVenda', JSON.stringify(resultadoVendas));

    } else if (localStorage.getItem('resultadoVenda') != null) {} else {

        let resultadoVendas = JSON.parse(localStorage.getItem('resultadoVenda'));
        resultadoVendas.push(resultadoVenda);
        
        localStorage.setItem('resultadoVenda', JSON.stringify(resultadoVendas));

    };

    removerVenda();

};

function vendas() {

    let itens = JSON.parse(localStorage.getItem('carrinho'));

    var soma = 0;

    for (let i = 0; i < itens.length; i++) { 
        
        let preco = itens[i].valor;
        let qtd = itens[i].quantidade;

        let total = (parseFloat(preco.replace(',','.')) * parseInt(qtd));

        soma += total;

    };

    document.querySelector('#soma').innerHTML = `${soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;

};

function removerVenda() {

    if (localStorage.length === 0) {} else {

        localStorage.removeItem('carrinho');

        localStorage.removeItem('resultadoVenda');

        localStorage.removeItem('cliente');

    };

};

function removerItem(nome) {
    
    let itens = JSON.parse(localStorage.getItem('carrinho'));
    
    for (let i = 0; i < itens.length; i++) {
        
        if (itens[i].nome === nome) {
            itens.splice(i, 1);
        };
        
        localStorage.setItem('carrinho', JSON.stringify(itens));
        
    };
    
};

function confirmarVenda() {

    criarLista();
    
    if (document.querySelector('.confirmacao').style.display == 'none') {
        
        document.querySelector('.confirmacao').style.display = 'block';
        
    } else {
    
        document.querySelector('.confirmacao').style.display = 'none';
    
    };

    let itens = JSON.parse(localStorage.getItem('carrinho'));

    var soma = 0;

    for (let i = 0; i < itens.length; i++) { 
        
        let preco = itens[i].valor;
        let qtd = itens[i].quantidade;

        let total = (parseFloat(preco.replace(',','.')) * parseInt(qtd));

        soma += total;

    };
    
    document.querySelector('#valorTotal-form').value = `${soma.toLocaleString('pt-br',{minimumFractionDigits: 2})}`;

};

function criarLista() {

    let recibo = JSON.parse(localStorage.getItem('carrinho'));

    let item = [];
    let valor = [];
    let qtd = [];

    for (let i = 0; i < recibo.length; i++) { 
        
        item.push(recibo[i].nome);
        valor.push((recibo[i].valor).replace(',','.'));
        qtd.push(recibo[i].quantidade);

    };

    document.querySelector('#item-local').value = `${item}`;
    document.querySelector('#valor-local').value = `${valor}`;
    document.querySelector('#qtd-local').value = `${qtd}`;

};

function tipoPagamento() {
    
    let tipoSelecao = document.querySelector('#tipoPagamento-form');
    let tipoSelecionado = tipoSelecao.options[tipoSelecao.selectedIndex].value;
    
    console.log(tipoSelecionado);
    
    if (tipoSelecionado == 'dinheiro') {
        
        document.querySelector('#tipoDependencia').style.display = 'block';
        
    } else {
    
        document.querySelector('#tipoDependencia').style.display = 'none';
    
    };
};


function desconto() {

    let desconto = (document.querySelector('#valorDesconto-form').value).replace(',','.');
    let total = (document.querySelector('#valorTotal-form').value).replace(',','.');

    let novoTotal = (total - desconto);

    document.querySelector('#valorTotal-form').value = `${novoTotal.toLocaleString('pt-br',{minimumFractionDigits: 2})}`;

};

function troco() {

    let recebido = (document.querySelector('#valorRecebido-form').value).replace(',','.');
    let total = (document.querySelector('#valorTotal-form').value).replace(',','.');

    let troco = (recebido - total);

    document.querySelector('#valorTroco-form').value = `${troco.toLocaleString('pt-br',{minimumFractionDigits: 2})}`;

};

// JQUERY

$(document).ready(function() {

    let pesquisa = $('#pesquisa');
    let pesquisar = $('#pesquisar');

    $(pesquisar).on('click', function() {

        pesquisa.submit();

    });

});

