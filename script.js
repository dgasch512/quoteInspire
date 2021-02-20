const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function ShowLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false; 
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  ShowLoadingSpinner();
  // pick a random quote from API array
  const quote = data[Math.floor(Math.random() * data.length)];
  // If author is blank, replace with 'unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Detect quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get quote from API
async function getQuotes() {
  ShowLoadingSpinner();
  const proxyURL = 'https://obscure-hollows-17127.herokuapp.com/'
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(proxyURL + apiURL);
    data = await response.json();
    newQuote();
    // console.log(data[0])
  } catch (error) {
    console.log('Nope, you fucked up', error)
  }
}; 

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuotes();