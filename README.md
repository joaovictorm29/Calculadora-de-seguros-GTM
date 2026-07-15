# Calculadora de Renovação e Comparação Financeira

Projeto desenvolvido por João Victor Maciel, com a ideia de facilitar o trabalho do setor de controladoria da empresa em que realiza estágio.

A aplicação foi criada para comparar propostas de seguros e verificar se a renovação de uma apólice compensa em relação à apólice anterior. Além disso, a mesma ferramenta também ajuda a decidir entre pagar à vista ou parcelado, uma necessidade recorrente para compras de equipamentos, veículos e outros itens da empresa.

## Visão geral

Este projeto foi pensado para otimizar processos internos, reduzir o tempo de análise manual e auxiliar na tomada de decisão com base em cálculos simples e objetivos.

Ele foi implementado inteiramente com:

- HTML
- CSS
- JavaScript

A interface é simples, direta e voltada para uso rápido no dia a dia de quem trabalha com controle financeiro e orçamento.

## Problema que o projeto resolve

No ambiente corporativo, comparar valores de seguros e entender se uma renovação é vantajosa pode exigir atenção a vários detalhes, como:

- preço anterior da apólice;
- preço atual da proposta;
- impacto de ICMS;
- variação percentual entre os valores;
- análise de melhor forma de pagamento (à vista ou parcelado).

A calculadora centraliza essas análises em uma única ferramenta, trazendo agilidade e mais segurança para a rotina do setor de controladoria.

## Funcionalidades

### 1. Comparação de apólices de seguro

A primeira parte da aplicação permite:

- inserir o valor da proposta antiga;
- inserir o valor da proposta nova;
- incluir o valor de ICMS, quando aplicável;
- verificar se a empresa possui ICMS na operação.

Com isso, a ferramenta calcula:

- valor antigo total;
- valor novo total;
- diferença entre os valores;
- variação percentual;
- status da renovação, com classificação visual.

### 2. Avaliação da compensação da renovação

A lógica principal compara a nova apólice com a anterior e apresenta um indicador da variação. Isso ajuda a responder rapidamente se a mudança representa:

- aumento muito alto;
- aumento aceitável;
- variação pequena;
- situação ruim para renovação.

### 3. Comparação entre pagamento à vista e parcelado

A segunda parte da ferramenta foi pensada para ampliar a utilidade da calculadora para situações como:

- compra de equipamentos;
- aquisição de veículos;
- outras compras empresariais com pagamento parcelado.

Nela, o usuário pode informar:

- valor à vista;
- valor parcelado;
- quantidade de parcelas;
- rendimento mensal estimado.

A partir desses dados, a aplicação analisa qual opção é mais vantajosa:

- pagar à vista;
- parcelar e investir o valor;
- ou considerar as opções praticamente equivalentes.

## Como a ferramenta funciona

### Cálculo de renovação

O cálculo da primeira seção considera a diferença entre o valor antigo e o novo, com ou sem o ICMS, e gera uma variação percentual.

A partir dessa variação, o sistema classifica o resultado em faixas e mostra uma indicação textual do nível da proposta.

### Cálculo financeiro entre à vista e parcelado

Na segunda seção, a ideia é comparar o que acontece se o valor da compra for pago à vista e investido, versus o valor parcelado pago ao longo do tempo.

A lógica simula o comportamento do capital ao longo das parcelas, considerando:

- o valor à vista como base de investimento;
- os rendimentos mensais informados;
- o pagamento de parcelas mês a mês;
- a comparação final entre as opções.

Esse tipo de análise é útil para decisões mais estratégicas e para visualizar a melhor alternativa financeira.

## Tecnologias utilizadas

O projeto foi construído com tecnologias simples, acessíveis e eficientes para um protótipo de uso interno:

- HTML5 para estrutura da página;
- CSS3 para visual e responsividade;
- JavaScript puro para toda a lógica de cálculo.

## Estrutura do projeto

```text
Calculadora_de_seguros_GTM/
├── index.html
├── style.css
├── script.js
└── assets/
    └── Logo GTM Engenharia.avif
```

## Como executar

Como o projeto é estático, basta abrir o arquivo `index.html` em um navegador.

Você também pode servir o projeto localmente com um servidor simples, por exemplo:

```bash
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

## Como usar

1. Abra a aplicação no navegador.
2. Preencha o valor da proposta antiga e da nova proposta.
3. Informe o ICMS, se houver.
4. Clique em "Calcular" para ver a comparação da renovação.
5. Na segunda seção, informe o valor à vista, o valor parcelado, a quantidade de parcelas e o rendimento mensal.
6. Clique em "Calcular" para verificar a melhor opção financeira.

## Observações

- A aplicação é uma solução prática de cálculo e apoio à decisão.
- O foco principal é facilitar a rotina de análise do setor de controladoria.
- Como é um projeto front-end simples, não há banco de dados nem autenticação.

## Melhorias futuras

Algumas melhorias que podem ser incorporadas no futuro:

- salvar histórico de cálculos;
- exportar resultados em PDF;
- suporte a múltiplas moedas;
- validação mais detalhada de campos;
- interface mais avançada com gráficos e comparações visuais.

## Autor

João Victor Maciel

## Licença

Este projeto foi desenvolvido para uso interno e de apoio operacional. Se desejar reutilizar o projeto, fique à vontade para adaptar e evoluir a ferramenta conforme a necessidade da sua empresa ou área.
