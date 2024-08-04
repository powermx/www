const cryptoPrices = {
    bitcoin: 0,
    litecoin: 0,
    ethereum: 0,
    ripple: 0,
    tron: 0
};

async function fetchPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,ethereum,ripple,tron&vs_currencies=usd');
        const prices = await response.json();
        
        cryptoPrices.bitcoin = prices.bitcoin.usd;
        cryptoPrices.litecoin = prices.litecoin.usd;
        cryptoPrices.ethereum = prices.ethereum.usd;
        cryptoPrices.ripple = prices.ripple.usd;
        cryptoPrices.tron = prices.tron.usd;

        displayPrices();
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

function displayPrices() {
    const cryptoPricesDiv = document.getElementById('crypto-prices');
    cryptoPricesDiv.innerHTML = '';
    for (const crypto in cryptoPrices) {
        cryptoPricesDiv.innerHTML += `
            <div class="crypto">
                <span>${crypto.charAt(0).toUpperCase() + crypto.slice(1)}: </span>
                <span class="price">$${cryptoPrices[crypto]}</span>
            </div>
        `;
    }
}

function calculateCrypto() {
    const usdAmount = document.getElementById('usd-amount').value;
    const selectedCrypto = document.getElementById('crypto-select').value;
    const cryptoAmount = usdAmount / cryptoPrices[selectedCrypto];
    displayResult(`You will get ${cryptoAmount.toFixed(6)} ${selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} for $${usdAmount} USD`);
}

function displayResult(resultText) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = resultText;
}

function closeWebApp() {
    // Telegram Web App close function
    Telegram.WebApp.close();
}

// Fetch prices and display user info on load
fetchPrices();
displayUserInfo();
