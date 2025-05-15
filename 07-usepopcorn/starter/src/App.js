import { useEffect, useRef, useState } from "react";
import StarRating from './starRating'
import useMovies from "./useMovies";
import useLocalStorageState from "./useLocalStorageState";
import useKey from "./useKey";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function NavBar({children}){  return (
    <nav className="nav-bar">
      {children}
  </nav>
  )
}

function Logo(){
return (
  <div className="logo">
  <span role="img">🍿</span>
  <h1>usePopcorn</h1>
</div> 
)
}

function NumResults({movies}){
return (
  <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
)
}

function Search({query,setQuery}){

  const inputElement = useRef(null);


  useKey('Slash',function(){
        if (document.activeElement===inputElement.current) return;
        inputElement.current.focus();
        setQuery("")

  })

return (
  <input
      className="search"
      type="text"
      placeholder="Search movies... (Press / to focus)"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
)
}

function Main({children}){

  return (<>
   <main className="main">
        {children}
      </main></>)
}

export default function App() {
  const [watched, setWatched] = useLocalStorageState([],'watched')
  // const [watched, setWatched] = useState(()=>JSON.parse(localStorage.getItem('watched')))

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId]=useState(null);

  
  function handleSelectMovie(movieId){
    setSelectedId((selectedId)=>(movieId===selectedId?null:movieId));
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  function handleAddWatched(movie){
    setWatched(watched=>[...watched,movie]);

  }
 
  function handleDeleteWatched(id){
    setWatched(watched=> watched.filter((movie)=> movie.imdbID !==id))
  }

  const {movies,isLoading,error} = useMovies(query);



  return (
    <>
    <NavBar  >
    <Logo/>
    <Search query={query} setQuery={setQuery}/>
    <NumResults movies={movies}/>
    </NavBar>
     <Main>
     <Box>
      {isLoading && <Loader/> }
      {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
      {error && <ErrorMessage message={error}/>}
     </Box>
     <Box>
      {
        selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} />
        :
        <>
        <WatchedSummary watched={watched} />
        <WatchedMoviesList onDeleteWatchedMovie={handleDeleteWatched} watched={watched} />        
        </>

      }

     </Box>
     </Main>
    </>
  );
}

function Loader(){
  return (
    <p className="loader">Loading...</p>
  )
}

function ErrorMessage({message}) {
  return (<p className="error">
    <span>📛</span> {message}
  </p>)
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);


  return (<div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && (
           children
          )}
        </div>)
}

function MovieList({movies,onSelectMovie}) {


  return (
    <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
    ))}
  </ul>
  )
}

function MovieDetails({selectedId,onCloseMovie,onAddWatched, watched}){
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map(movie=>movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(movie=>movie.imdbID === selectedId)?.userRating;


  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current +1
  }, [userRating]);

  const {Title:title,Year:year,Poster:poster,Runtime:runtime,imdbRating,Plot:plot, Released:released,Actors:actors,Director:director,Genre:genre}=movie

  useKey('Escape',onCloseMovie)

  function handleAdd(){
    const newWatchedMovie={
      imdbID:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
      countRatingDecisions:countRef.current,  
    }


    onAddWatched(newWatchedMovie)
    onCloseMovie();
  }

    useEffect(() => {
    async function getMovieDetails() {
      setisLoading(true)
      const res = await fetch(`https://www.omdbapi.com/?apikey=485e5acb&i=${selectedId}`)
      const data = await res.json()
      setMovie(()=>data)
      setisLoading(false)

    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title=`MOVIE: ${title}`


    return function (){
      document.title='usePopcorn'
    }
  }, [title]);



  return(
    <div className="detail">
      {isLoading ? <Loader/>
      : 
      <>
      <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ?
              
              <>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating > 0 &&
                (<button className="btn-add" onClick={handleAdd}>Add to List </button>)
              }
              </>
              : 
              <p>You rated this movie already {watchedUserRating} 🌟</p>
              }
                          </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
      </>
      }
      
      </div>
  )
}

function Movie({movie,onSelectMovie}){
  return (
    <li onClick={()=>onSelectMovie(movie.imdbID)} >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
  )
}

function WatchedSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgRuntime} min</span>
            </p>
          </div>
        </div>
  )
}

function WatchedMoviesList({watched, onDeleteWatchedMovie}) {
  return (
    <ul className="list">
          {watched.map((movie) => (
           <WatchedMovie onDeleteWatchedMovie={onDeleteWatchedMovie} movie={movie} key={movie.imdbID}/>
          ))}
        </ul>
  )
}
function WatchedMovie({movie,onDeleteWatchedMovie}){
  return (
    <li>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={()=>onDeleteWatchedMovie(movie.imdbID)}>X</button>
    </div>
  </li>
  )
}