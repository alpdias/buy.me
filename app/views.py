# -*- coding: utf-8 -*-

'''
Criado em 09/2020
@Autor: Paulo https://github.com/alpdias
'''

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from .models import pessoas, estoque, vendas

# Create your views here.

def home(request):

    """
    ->
    :return:
    """
    
    return render(request, 'app/home.html')


def about(request):

    """
    ->
    :return:
    """
    
    return render(request, 'app/about.html')


def contact(request):

    """
    ->
    :return:
    """
    
    return render(request, 'app/contact.html')


@login_required
def dashboard(request):

    """
    ->
    :return:
    """
    
    return render(request, 'app/dashboard.html')

@login_required
def buy(request):

    """
    ->
    :return:
    """
    
    vendido = vendas.objects.all()

    return render(request, 'app/buy.html', {'vendido': vendido})  


@login_required
def cart(request):

    """
    ->
    :return:
    """

    if request.method == 'POST':

        nomeCliente = request.POST.get('nomeCliente-form')
        valorTotal = request.POST.get('valorTotal-form')
        tipoPgto = request.POST.get(['tipoPagamento-form'][0])
        vendaStatus = request.POST.get(['statusVenda-form'][0])
        
        f = vendas(cliente = nomeCliente, valor = valorTotal, pagamento = tipoPgto, status = vendaStatus)
        f.save()
        
        return redirect('app/buy.html')
    
    else:
        pass

    return render(request, 'app/cart.html')  


@login_required
def records(request):

    """
    ->
    :return:
    """
    
    registros = pessoas.objects.all()

    return render(request, 'app/records.html', {'registros': registros})


@login_required
def products(request):

    """
    ->
    :return:
    """
    
    produtos = estoque.objects.all()

    return render(request, 'app/products.html', {'produtos': produtos})  


@login_required
def stock(request, id):

    """
    ->
    :return:
    """

    estoques = get_object_or_404(estoque, pk=id)

    return render(request, 'app/stock.html', {'estoques': estoques})


@login_required
def people(request, id):

    """
    ->
    :return:
    """

    pessoa = get_object_or_404(pessoas, pk=id)

    return render(request, 'app/people.html', {'pessoa': pessoa})


class register(generic.CreateView):

    """
    ->
    :return:
    """

    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/register.html'


def pdf(itesVenda, quantidadeItens, valorItens, totalVenda, pagamentoTipo, valorTroco):

    from reportlab.pdfgen import canvas

    item = itesVenda
    quantidade = quantidadeItens
    valor = valorItens

    qtd = len(item)
    total = totalVenda
    pagamento = pagamentoTipo
    troco = valorTroco

    pdf = canvas.Canvas('recibo.pdf', pagesize=(256, (400 + (qtd * 14))))

    recibo = ['------------------------------------------------------------',
    'EMPRESA ABC LTDA',
    'RUA NADA, 1000',
    'SAO PAULO - SP',
    '------------------------------------------------------------',
    'CNPJ 00.000.000/0000-00',
    '------------------------------------------------------------',
    'EXTRATO N. 0001',
    'RECIBO DE COMPRA E VENDA',
    '00/00/0000',
    '------------------------------------------------------------',
    '',
    'ITEM | QTD | VALOR R$',
    '',
    '',
    f'TOTAL ITENS: {qtd}',
    f'TOTAL: {total}',
    f'PAGAMENTO: {pagamento}',
    f'TROCO: {troco}',
    '',
    '------------------------------------------------------------',
    '',
    'VOLTE SEMPRE !!',
    '',
    '------------------------------------------------------------']

    formato = (380 + (qtd * 14))

    #cabecalho
    i = 14

    while i > 0:
        pdf.drawCentredString(128, (formato - 14), recibo[0])
        recibo.pop(0)
        formato = formato - 14
        i = i - 1
    #cabecalho

    #itens
    i = qtd

    while i > 0:
        pdf.drawString(16, (formato - 14), f'{item[0]}  |  {quantidade[0]}  |  {valor[0]}')
        item.pop(0)
        quantidade.pop(0)
        valor.pop(0)
        formato = formato - 14
        i = i - 1
    #itens

    #totalizador
    i = 6

    while i > 0:
        pdf.drawString(16, (formato - 14), recibo[0])
        recibo.pop(0)
        formato = formato - 14
        i = i - 1
    #totalizador

    #rodape
    i = 5

    while i > 0:
        pdf.drawCentredString(128, (formato - 14), recibo[0])
        recibo.pop(0)
        formato = formato - 14
        i = i - 1
    #rodape

    pdf.save()

