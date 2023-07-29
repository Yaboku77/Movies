const buttons = [];

    // Fetches movie data from TMDB API for a specific movie ID
    const apiKey = '3dfa4bae246f35044e56a6dcd3294e3f';

    // Function to fetch movie details from TMDB API
    async function fetchMovieDetails(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Function to fetch series details from TMDB API
    async function fetchSeriesDetails(seriesId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Function to fetch trailer key for a movie from TMDB API
    async function fetchTrailerKey(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer');
        return trailer ? trailer.key : null;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }

    // Function to fetch age rating for a movie from TMDB API
    async function fetchAgeRating(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`);
        const data = await response.json();
        const usRelease = data.results.find(release => release.iso_3166_1 === 'US');
        return usRelease ? usRelease.release_dates[0].certification : 'Not Rated';
      } catch (error) {
        console.error('Error:', error);
        return 'Not Rated';
      }
    }

    // Function to fetch director for a movie from TMDB API
    async function fetchDirector(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        const data = await response.json();
        const director = data.crew.find(person => person.job === 'Director');
        return director ? director.name : 'Not Available';
      } catch (error) {
        console.error('Error:', error);
        return 'Not Available';
      }
    }

    // Function to generate code from movie details
    async function generateCode() {
      const movieId = document.getElementById('movieId').value;
      const seriesId = document.getElementById('seriesId').value;

      if (movieId) {
        const movie = await fetchMovieDetails(movieId);
        const trailerKey = await fetchTrailerKey(movieId);
        movie.ageRating = await fetchAgeRating(movieId);
        movie.director = await fetchDirector(movieId);

        let buttonsHTML = '';
        for (const button of buttons) {
          buttonsHTML += `<a class="hover:cursor-pointer md:ml-10 md:mt-9 lg:ml-10 lg:mt-9 xl:ml-10 xl:mt-9 ml-5 mt-5" id="btn-grad" href="${button.url}">
            <p class="text-sm font-semibold">${button.title}</p></a>`;
        }

        const titleBox = document.getElementById('titleBox');
        titleBox.textContent = `${movie.title}`;

        const genresBox = document.getElementById('genresBox');
        const genres = movie.genres.map(genre => genre.name).join(', ');
        genresBox.textContent = `${genres}`;

        const code = `
          <div class="bg-gray-800 rounded-lg md:m-9 md:mb-3 md:flex lg:m-9 lg:mb-3 lg:flex xl:m-9 xl:mb-3 xl:flex m-2 mb-3" id="info-holder">
            <div id="poster" class="mx-auto" style="height: 460px; min-width: 331px; max-width: 331px;">
              <img alt="" class="md:rounded-l-lg md:block lg:block xl:block w-full h-full" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster"/>
            </div>

            <a name='more'></a>

            <div class="md:pt-0 lg:pt-0 xl:pt-0 pt-px">
              <p style="font-size: 24px;" class="text-white font-semibold m-8 md:ml-10 lg:ml-10 xl:ml-10 ml-5 md:my-6 lg:my-6 xl:my-6 my-3 truncate">
                ${movie.title}
              </p>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-white text-sm">
                  <span class="text-gray-400 text-sm mr-1">Sinopsis:-</span>
                  ${movie.overview}
                </p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2 truncate">
                <p class="text-gray-400 text-sm mr-1">Genres:-</p>
                <p class="text-white text-sm" id="tags">
                  ${genres}
                </p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Release Date:-</p>
                <p class="text-white text-sm">${movie.release_date}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Rating:-</p>
                <p class="text-white text-sm">${movie.vote_average}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Running Time:-</p>
                <p class="text-white text-sm">${movie.runtime} minutes</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Director:-</p>
                <p class="text-white text-sm">${movie.director}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Status:-</p>
                <p class="text-white text-sm">${movie.status}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Age Rating:-</p>
                <p class="text-white text-sm">${movie.ageRating}</p>
              </div>
            </div>
          </div>

          <!--Download Links Here-->

          <div id="watch" class="bg-gray-800 md:mx-9 lg:mx-9 xl:mx-9 mx-2 rounded-lg mb-4 md:p-5 lg:p-5 xl:p-5 p-3.5 pr-0">
            <p class="text-white text-lg font-semibold ml-1 mb-4">Download Links</p>
            <center>
              ${buttonsHTML}
            </center>
          </div>

          <!--Video Links Here-->

          <div class="md:m-10 lg:m-10 xl:m-10 m-2 rounded-lg md:flex lg:flex xl:flex bg-gray-800">
            <div class="bg-black h-vw-65 md:h-96 lg:h-112 xl:h-136 2xl:h-152 w-full relative">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/${trailerKey}"></iframe>
            </div>
          </div>
        `;

        document.getElementById('codeBox').textContent = code;
      } else if (seriesId) {
        const series = await fetchSeriesDetails(seriesId);
        const trailerKey = await fetchTrailerKey(seriesId);

        let buttonsHTML = '';
        for (const button of buttons) {
          buttonsHTML += `<a class="hover:cursor-pointer md:ml-10 md:mt-9 lg:ml-10 lg:mt-9 xl:ml-10 xl:mt-9 ml-5 mt-5" id="btn-grad" href="${button.url}">
            <p class="text-sm font-semibold">${button.title}</p></a>`;
        }

        const titleBox = document.getElementById('titleBox');
        titleBox.textContent = `${series.name}`;

        const genresBox = document.getElementById('genresBox');
        const genres = series.genres.map(genre => genre.name).join(', ');
        genresBox.textContent = `${genres}`;

        const code = `
          <div class="bg-gray-800 rounded-lg md:m-9 md:mb-3 md:flex lg:m-9 lg:mb-3 lg:flex xl:m-9 xl:mb-3 xl:flex m-2 mb-3" id="info-holder">
            <div id="poster" class="mx-auto" style="height: 460px; min-width: 331px; max-width: 331px;">
              <img alt="" class="md:rounded-l-lg md:block lg:block xl:block w-full h-full" src="https://image.tmdb.org/t/p/w500${series.poster_path}" alt="${series.name} Poster"/>
            </div>

            <a name='more'></a>

            <div class="md:pt-0 lg:pt-0 xl:pt-0 pt-px">
              <p style="font-size: 24px;" class="text-white font-semibold m-8 md:ml-10 lg:ml-10 xl:ml-10 ml-5 md:my-6 lg:my-6 xl:my-6 my-3 truncate">
                ${series.name}
              </p>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-white text-sm">
                  <span class="text-gray-400 text-sm mr-1">Sinopsis:-</span>
                  ${series.overview}
                </p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2 truncate">
                <p class="text-gray-400 text-sm mr-1">Genres:-</p>
                <p class="text-white text-sm" id="tags">
                  ${genres}
                </p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">First Air Date:-</p>
                <p class="text-white text-sm">${series.first_air_date}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Rating:-</p>
                <p class="text-white text-sm">${series.vote_average}</p>
              </div>
              
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Running Time:-</p>
                <p class="text-white text-sm">${series.runtime} minutes</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Director:-</p>
                <p class="text-white text-sm">${series.director}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Status:-</p>
                <p class="text-white text-sm">${series.status}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Age Rating:-</p>
                <p class="text-white text-sm">${series.ageRating}</p>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Number of Seasons:-</p>
                <p class="text-white text-sm">${series.number_of_seasons}</p>
              </div>
              <div class="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
                <p class="text-gray-400 text-sm mr-1">Number of Episodes:-</p>
                <p class="text-white text-sm">${series.number_of_episodes}</p>
              </div>
            </div>
          </div>

          <!--Download Links Here-->

          <div id="watch" class="bg-gray-800 md:mx-9 lg:mx-9 xl:mx-9 mx-2 rounded-lg mb-4 md:p-5 lg:p-5 xl:p-5 p-3.5 pr-0">
            <p class="text-white text-lg font-semibold ml-1 mb-4">Download Links</p>
            <center>
              ${buttonsHTML}
            </center>
          </div>

          <!--Video Links Here-->

          <div class="md:m-10 lg:m-10 xl:m-10 m-2 rounded-lg md:flex lg:flex xl:flex bg-gray-800">
            <div class="bg-black h-vw-65 md:h-96 lg:h-112 xl:h-136 2xl:h-152 w-full relative">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/${trailerKey}"></iframe>
            </div>
          </div>
        `;

        document.getElementById('codeBox').textContent = code;
      }
    }

    // Function to copy code to clipboard
    function copyCode() {
      const codeBox = document.getElementById('codeBox');
      const range = document.createRange();
      range.selectNode(codeBox);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      alert('Code copied to clipboard!');
    }

    // Function to add a new button
    function addButton() {
      const title = prompt('Enter button title:');
      const url = prompt('Enter button URL:');

      buttons.push({ title, url });

      const addedButtons = document.getElementById('addedButtons');
      const button = document.createElement('button');
      button.textContent = title;
      addedButtons.appendChild(button);
}
                      
