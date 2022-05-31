const axios = require('axios').default;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const baseUrl = 'https://www.imdb.com';
const [endingUrl, movieCount] = process.argv.slice(2);
const imdbUrl = endingUrl;
const movieNumber = parseInt(movieCount);


console.log(`Top ${movieNumber} Movies are:`);
(async () => {
 
    const url = await axios.get(imdbUrl);
    const moviesPage = new JSDOM(url.data).window.document;
    const movieList = moviesPage.getElementsByTagName('tr');

    let TopMovies = [];

    for (let i = 1; i <= movieNumber; i++) {
    
        const title = movieList[i].querySelector('td:nth-child(2) a').innerHTML;

       
        const movie_release_year = movieList[i].querySelector('td:nth-child(2) span').innerHTML.substr(1, 4);

        
        const imdb_rating = movieList[i].querySelector('td:nth-child(3) strong').innerHTML;

        const movieUrl = baseUrl + movieList[i].querySelector('td:nth-child(2)').children[0].href;
        const movieDetail = await axios.get(movieUrl);
        const singleMoviePage = new JSDOM(movieDetail.data).window.document;   // const summary = singleMoviePage.querySelector('.GenresAndPlot__TextContainerBreakpointL-sc-cum89p-1').innerHTML;

        const time = singleMoviePage.querySelector('[data-testid="title-techspecs-section"]');
        const time1 = time.querySelector('ul li div').innerHTML.trim();
        const duration = time1.replace(/[<!-->\s+]/g, '').replace("hours", "h ").replace("minutes", "min");

      
        TopMovies.push({
            title,
            movie_release_year,
            imdb_rating,
            duration,
        });
    }
    console.log(TopMovies);
    return TopMovies;
})();