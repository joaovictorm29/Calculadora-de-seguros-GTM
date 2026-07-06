// Inputs
const oldValueInput = document.getElementById("oldValue");
const newValueInput = document.getElementById("newValue");
const icmsInput = document.getElementById("icms");
const hasIcmsCheckbox = document.getElementById("hasIcms");

// Botão
const calculateButton = document.getElementById("calculateBtn");
const clearButton = document.getElementById("clearBtn");

// Resultados
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

