/*
 * This repo is for education purposes.
 * You are free to copy and use the code as you wish, I only ask you get
 * your own API key at https://newsapi.org/
 * */

const API_KEY = 'f8f7d5a70d8e417eadcd3916ba08997e';
// ABC-News, Al-Jazeera-English, ars-technica, associated-press, axios, bleacher-report, bloomberg, breitbart-news, business-insider, buzzfeed, cbs-news, cnn, crypto-coins-news, engadget, entertainment-weekly, espn, fortune, fox-news, fox-sports, google-news, hacker-news, ign, mashable, medical-news-today, msnbc, mtv-news, national-geographic
const sources = 'bbc-sport,bleacher-report,espn';
const category = 'sports'; // business, entertainment, general, health, science, sports, technology

const heroBannerContent = document.querySelector('.jsHeroBannerContent');
const gridNews = document.querySelector('.news-card-grid');

const fetchNews = (API_KEY) => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com';
  const api = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${API_KEY}`;
  const API_URL = new URL(api);

  fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      const articles = json.articles;
      renderCards(articles);
      renderGrid(articles);
    })
    .catch((error) => console.log(error.message));
};

const renderCards = (articles) => {
  if (articles) {
    const fiveArticles = articles.slice(0, 5);
    fiveArticles.forEach((article, i) => {
      let html = `
        <div
          class="item item-${i} bg-image-positioner"
          style="background-image: url('${article.urlToImage}')">
            <div class="inner">
              <h2 class="title">${article.title}</h2>
              <p class="description">${article.description}</p>
              <span class="ribbon">${article.sources.name}</span>
            </div>
        </div>
      `;
      heroBannerContent.innerHTML += html;
    });
  } else {
    heroBannerContent.innerHTML = 'no articles sorry';
  }
};

const renderGrid = (articles) => {
  if (articles) {
    const articleSlice = articles.slice(5, 30); // dont load first five images as already in use above
    articleSlice.forEach((article, i) => {
      let html = `
        <a href="${article.url}"
          class="item item-${i} bg-image-positioner"
          style="background-image: url('${article.urlToImage}')">
            <div class="inner">
              <h2 class="title">${article.title}</h2>
              <span class="ribbon">${article.source.name}</span>
            </div>
        </a>
      `;
      gridNews.innerHTML += html;
    });
  } else {
    gridNews.innerHTML = 'no articles sorry';
  }
};

fetchNews(API_KEY);
