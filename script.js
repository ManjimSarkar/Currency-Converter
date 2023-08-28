const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");

// Fetch available currencies from the API
fetch("https://api.exchangerate.host/latest?base=USD")
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      const option2 = option1.cloneNode(true);
      fromCurrencySelect.appendChild(option1);
      toCurrencySelect.appendChild(option2);
    });
  });

// Convert currency when button is clicked
convertBtn.addEventListener("click", () => {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    .then(response => response.json())
    .then(data => {
      const convertedAmount = data.result.toFixed(2);
      resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });
});
