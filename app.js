const request = superagent
const api = {
  url: 'https://api.themoviedb.org/3/movie/',
  key: 'b21e4e4688626d2b454b9bf55959a588'
}
let template = ''
const container = document.querySelector('.container')

function getTopRatedMovie() {
  return request.get(`${api.url}top_rated?api_key=${api.key}`)
}

function getCastFromBestTopRatedMovie(movieId) {
  return request.get(`${api.url}${movieId}/credits?api_key=${api.key}`)
}

function printInScreen(data) {
  const members = data.body.cast
    
  members.forEach(function(member) {
    const profilePicture = (member.profile_path !== null)
      ? `https://image.tmdb.org/t/p/w500/${member.profile_path}`
      : 'https://www.mearto.com/assets/no-image-83a2b680abc7af87cfff7777d0756fadb9f9aecd5ebda5d34f8139668e0fc842.png'
    template += 
      `<div class='character'>
        <picture>
          <img src='${profilePicture}' alt='' />
        </picture>
        <h2>${member.name}</h2>
      </div>`
  })
  
  container.innerHTML = template
}


getTopRatedMovie()
  .then(function(response) {
    const movies = response.body.results
    let movieId = 0
    
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i]
      
      if (movie.original_language === 'hi') {
        movieId = movie.id
        break
      }
    }
  
    return movieId
  })
  .then(getCastFromBestTopRatedMovie)
  .then(printInScreen)
