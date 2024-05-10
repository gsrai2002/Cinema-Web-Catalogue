import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Movie from './Movie';
import TV from './TV';

const Details = () => {

  const { media_type, id } = useParams();
  const api_key = process.env.REACT_APP_API_KEY;
  const url1 = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&append_to_response=videos`;
  const url2 = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}`;
  
  const [details, setDetails] = useState({});
  const [itemCrew, setItemCrew] = useState({});
    
  const fetch_data = async (url1, url2) => {
    const itemData = await fetch(url1);
    const itemJsonData = await itemData.json();
    setDetails(itemJsonData);
    const crewData = await fetch(url2);
    const crewJsonData = await crewData.json();
    setItemCrew(crewJsonData);
  }  

  useEffect(() => { 
    fetch_data(url1, url2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const {
    //general
    adult, backdrop_path, genres, homepage, spoken_languages, overview, poster_path, tagline, vote_average, status, videos,
    //movies
    budget, imdb_id, title, release_date, revenue, runtime,
    //tv
    created_by, episode_run_time, first_air_date, in_production, name, networks, number_of_episodes, number_of_seasons, origin_country
  } = details;

  let team=[];

  if(Object.keys(itemCrew).length !== 0){

    let {
      cast, crew
    } = itemCrew;
  
    cast.sort(function(a,b){return b.popularity-a.popularity});
    crew.sort(function(a,b){return b.popularity-a.popularity});
    team=cast.slice(0,Math.floor(cast.length*0.5));
    let directors=0, producers=0, writers=0;
    crew.forEach(member => {
      if((member.job === "Director" || member.department === "Directing") && directors < 3){
          team.push(member);
          directors += 1;
      }else if(member.department === "Writing" && writers < 3){
          team.push(member);
          writers += 1;
      }else if((member.job === "Executive Producer" || member.job === "Producer") && producers < 3){
          team.push(member);
          producers += 1;
      }
    });
  
  }

  return (
    <>

    {media_type==="movie"?
    
    <Movie adult={adult} backdrop_path={backdrop_path} genres={genres} homepage={homepage} spoken_languages={spoken_languages} overview={overview} poster_path={poster_path} tagline={tagline} vote_average={vote_average} status={status} budget={budget} imdb_id={imdb_id} title={title} release_date={release_date} revenue={revenue} runtime={runtime} team={team} videos={videos}/>:
    
    <TV adult={adult} backdrop_path={backdrop_path} genres={genres} homepage={homepage} spoken_languages={spoken_languages} overview={overview} poster_path={poster_path} tagline={tagline} vote_average={vote_average} status={status} created_by={created_by} episode_run_time={episode_run_time} first_air_date={first_air_date} in_production={in_production} name={name} networks={networks} number_of_episodes={number_of_episodes} number_of_seasons={number_of_seasons} origin_country={origin_country} team={team} videos={videos}/>}
    
    <footer class="footer">Made with 💖 by Tanishk</footer>

    </>
  )
}

export default Details