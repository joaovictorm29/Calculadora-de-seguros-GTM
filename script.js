
const oldValueInput = document.getElementById("oldValue");
const newValueInput = document.getElementById("newValue");
const icmsInput = document.getElementById("icms");
const hasIcmsCheckbox = document.getElementById("hasIcms");

const calculateButton = document.getElementById("calculateBtn");
const clearButton = document.getElementById("clearBtn");

const oldResult = document.getElementById("oldResult");
const newResult = document.getElementById("newResult");
const differenceResult = document.getElementById("difference");
const percentResult = document.getElementById("percent");
const progressBar = document.getElementById("bar");
const statusText = document.getElementById("statusText");

calculateButton.addEventListener("click", calculateProposal);
clearButton.addEventListener("click", resetForm);

function calculateProposal() {

    // Pega os valores digitados
    const oldValue = parseFloat(oldValueInput.value);
    const newValue = parseFloat(newValueInput.value);
    const icms = parseFloat(icmsInput.value) || 0;

    // Verifica se os campos obrigatórios foram preenchidos
    if (isNaN(oldValue) || isNaN(newValue)) {
        alert("Preencha os valores das propostas.");
        return;
    }

    let totalOld = oldValue;
    let totalNew = newValue;

    // Se houver ICMS, soma ao total
    if (hasIcmsCheckbox.checked) {
        totalOld += icms;
        totalNew += icms;
    }

    const difference = totalNew - totalOld;

    // Calcula a porcentagem de variação
    const percentage = totalOld === 0 ? 0 : (difference / totalOld) * 100;
    const absPercentage = Math.abs(percentage);
    const status = getVariationStatus(absPercentage);

    // Atualiza os resultados na tela
    oldResult.textContent = `R$ ${totalOld.toFixed(2)}`;
    newResult.textContent = `R$ ${totalNew.toFixed(2)}`;
    differenceResult.textContent = `R$ ${difference.toFixed(2)}`;
    percentResult.textContent = `${percentage.toFixed(2)}%`;
    statusText.textContent = status.label;

    // Atualiza a barra de progresso
    progressBar.style.width = `${Math.min(absPercentage, 100)}%`;
    progressBar.style.backgroundColor = status.color;
}

function getVariationStatus(percentage) {
    if (percentage <= 5) {
        return { label: "Ruim — variação entre 0% e 5%", color: "#DC2626" };
    }

    if (percentage <= 7) {
        return { label: "Ok, poderia melhorar — variação entre 5% e 7%", color: "#F59E0B" };
    }

    if (percentage <= 10) {
        return { label: "Ok/aceitável — variação entre 8% e 10%", color: "#22C55E" };
    }

    if (percentage <= 15) {
        return { label: "Bom — variação entre 10% e 15%", color: "#16A34A" };
    }

    if (percentage <= 20) {
        return { label: "Muito bom — variação entre 15% e 20%", color: "#0F766E" };
    }

    return { label: "Excelente — acima de 20%", color: "#0C4A6E" };
}

function resetForm() {
    oldValueInput.value = "";
    newValueInput.value = "";
    icmsInput.value = "";
    hasIcmsCheckbox.checked = false;

    oldResult.textContent = "R$ 0,00";
    newResult.textContent = "R$ 0,00";
    differenceResult.textContent = "R$ 0,00";
    percentResult.textContent = "0%";
    statusText.textContent = "Sem variação";
    progressBar.style.width = "0%";
    progressBar.style.backgroundColor = "var(--primary)";
}


// ============================================================
// NOVA CALCULADORA: À VISTA x PARCELADO
// ============================================================
//
// Objetivo: simular mês a mês o que aconteceria se, em vez de
// pagar à vista, você investisse esse valor e fosse retirando
// uma parcela por mês dele (juros compostos + fluxo de caixa).
// ============================================================

const cashPriceInput = document.getElementById("cashPrice");
const installmentPriceInput = document.getElementById("installmentPrice");
const installmentsInput = document.getElementById("installments");
const monthlyRateInput = document.getElementById("monthlyRate");

const financeButton = document.getElementById("financeBtn");
const financeClearButton = document.getElementById("financeClearBtn");

const savingResult = document.getElementById("savingResult");
const investmentResult = document.getElementById("investmentResult");
const financeDifferenceResult = document.getElementById("financeDifference");
const bestOptionResult = document.getElementById("bestOption");
const financeBar = document.getElementById("financeBar");
const financeStatus = document.getElementById("financeStatus");

financeButton.addEventListener("click", calculateFinance);
financeClearButton.addEventListener("click", resetFinanceForm);

function calculateFinance() {

    const cashPrice = parseFloat(cashPriceInput.value);
    const installmentPrice = parseFloat(installmentPriceInput.value);
    const installments = parseInt(installmentsInput.value);
    const monthlyRate = parseFloat(monthlyRateInput.value);

    if (isNaN(cashPrice) || isNaN(installmentPrice) || isNaN(installments) || installments <= 0) {
        alert("Preencha corretamente o valor à vista, o valor parcelado e a quantidade de parcelas.");
        return;
    }

    // Rendimento é opcional: se não informado, assumimos 0% (sem investimento)
    const rate = isNaN(monthlyRate) ? 0 : monthlyRate;

    const installmentAmount = installmentPrice / installments;

    // 4. Diferença "crua" entre o total parcelado e o valor à vista.
    //    Isso NÃO considera rendimento nenhum, é só o quanto a mais
    //    você paga no total se optar por parcelar.
    const rawSaving = installmentPrice - cashPrice;

    //    Começamos com o valor à vista investido e, a cada mês,
    //    primeiro aplicamos o rendimento (juros compostos) e depois
    //    descontamos o valor de uma parcela.
    let balance = cashPrice;

    for (let month = 1; month <= installments; month++) {
        balance = balance * (1 + rate / 100); // rendimento do mês
        balance = balance - installmentAmount; // pagamento da parcela do mês
    }

    // 6. Isola o quanto foi ganho só de juros (rendimento puro).
    //    Sem nenhum rendimento, o saldo final seria simplesmente:
    //    cashPrice - installmentPrice (subtração direta, sem juros).
    const balanceWithoutInterest = cashPrice - installmentPrice;
    const interestEarned = balance - balanceWithoutInterest;

    let bestOption;
    let statusMessage;
    let barColor;

    if (balance > 0.01) {
        bestOption = "Parcelado";
        statusMessage = "Parcelar e investir o valor à vista rende mais do que a economia de pagar à vista.";
        barColor = "#16A34A"; 
    } else if (balance < -0.01) {
        bestOption = "À Vista";
        statusMessage = "Pagar à vista é mais vantajoso: o rendimento do investimento não cobre o custo das parcelas.";
        barColor = "#DC2626"; 
    } else {
        bestOption = "Equivalente";
        statusMessage = "As duas opções são praticamente equivalentes.";
        barColor = "#F59E0B"; 
    }

    // 8. Atualiza os resultados na tela
    savingResult.textContent = `R$ ${rawSaving.toFixed(2)}`;
    investmentResult.textContent = `R$ ${interestEarned.toFixed(2)}`;
    financeDifferenceResult.textContent = `R$ ${balance.toFixed(2)}`;
    bestOptionResult.textContent = bestOption;
    financeStatus.textContent = statusMessage;

    // 9. Atualiza a barra de progresso, mostrando a intensidade
    //    da diferença como % do valor à vista (limitada a 100%)
    const percentDiff = cashPrice === 0 ? 0 : Math.abs(balance / cashPrice) * 100;
    financeBar.style.width = `${Math.min(percentDiff, 100)}%`;
    financeBar.style.backgroundColor = barColor;
}

function resetFinanceForm() {
    cashPriceInput.value = "";
    installmentPriceInput.value = "";
    installmentsInput.value = "";
    monthlyRateInput.value = "";

    savingResult.textContent = "R$ 0,00";
    investmentResult.textContent = "R$ 0,00";
    financeDifferenceResult.textContent = "R$ 0,00";
    bestOptionResult.textContent = "-";
    financeStatus.textContent = "Aguardando cálculo.";
    financeBar.style.width = "0%";
    financeBar.style.backgroundColor = "var(--primary)";
}