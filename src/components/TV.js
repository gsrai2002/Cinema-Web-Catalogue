/* eslint-env jquery */
import React from 'react';
import Member from './Member';

const images_api= "https://image.tmdb.org/t/p/w1280";

const TV = ({adult, backdrop_path, genres, homepage, spoken_languages, overview, poster_path, tagline, vote_average, status, created_by, episode_run_time, first_air_date, in_production, name, networks, number_of_episodes, number_of_seasons, origin_country, team, videos}) => {

  function setImageClass () {
    switch(true){
      case($(window).width()<425): $("body").attr("style", backdrop_path?`background-image: url(${images_api + poster_path}`:"background-color: none");
      break;
      default: $("body").attr("style", backdrop_path?`background-image: url(${images_api + backdrop_path}`:"background-color: none");
      break;
    }
  }

  $(document).ready(function() {
    setImageClass();
    $("body").addClass("bg");
  });

  $(window).resize(function() {
    setImageClass();
  });

  let video_key = null;
  if(videos){
    for(let i = 0; i < videos.results.length; i += 1){
      if(videos.results[i].name.includes("Trailer")){
        video_key=videos.results[i].key;
        break;
      }
    }
    if(!video_key){
      for(let i = 0; i < videos.results.length; i += 1){
        if(videos.results[i].name.includes("Teaser")){
          video_key=videos.results[i].key;
          break;
        }
      }
    }
    if(!video_key){
      for(let i = 0; i < videos.results.length; i += 1){
        if(videos.results[i].name.includes("Spot")){
          video_key=videos.results[i].key;
          break;
        }
      }
    }
    if(!video_key){
      for(let i = 0; i < videos.results.length; i += 1){
        if(videos.results[i].name.includes("Promo")){
          video_key=videos.results[i].key;
          break;
        }
      }
    }
  }

  let cast = 0, directors = 0, producers = 0, writers = 0;
  team && team.forEach(member => {
    if(member.known_for_department==="Acting" && member.character){
      cast += 1;
    }else if(member.job === "Director" || member.department==="Directing"){
      directors += 1;
    }else if(member.job && member.job.includes("Producer")){
      producers += 1;
    }else if(member.department==="Writing"){
      writers += 1;
    }
  });

  return (
    <>
    
    <div className="details-header">
      <div className="details-header-text">
        <a className="item name text-animation" href={homepage} target="blank">{name}</a>
        <div className="item tagline">{tagline}</div>
        <div className="item type">TV Series</div>
      </div>
      <div className="details-header-video">
        {video_key && 
          <iframe className="item video" title="trailer"
          src={`https://www.youtube.com/embed/${video_key}?autoplay=1&mute=1&playlist=${video_key}&loop=1`}>
          </iframe>
        }
      </div>
    </div>

    <div className="details-modal">
      

      <div className="details-modal-header">
        <div className="item poster-container">
          <img className='poster' height="200px" width="133px" src={backdrop_path?images_api+poster_path:"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} alt="poster" />
        </div>
        <div className="item title-container">
          <div className="item name">{name}</div>
          {tagline && <div className="item tagline">{`"${tagline}"`}</div>}
        </div>
      </div>

      <div className="details-modal-bar">
        <div className="item rating">Rating: {vote_average}</div>
        <div className="item adult">Adult: {adult?'true':'false'}</div>
      </div>

      <div className="details-modal-description">

        <div className="item description-overview">
          <div className="item overview">
            <span className="label">Overview:</span>
            <span className="value"> {overview}</span>
          </div>
          <div className="item genres">
            <span className="label">Genres:</span> 
            {genres && genres.map((genre, index)=>{
              return <span className="value" key={index}> {genre.name} </span>;
            })}
          </div>
        </div>

        <div className="item description-trivial">
          <div className="item spoken-languages">
            <span className="label">Spoken Languages:</span>
            {spoken_languages && spoken_languages.map((language, index)=>{
              return <span className="value" key={index}> {language.english_name} </span>;
            })}
          </div>
          <div className="item status">
            <span className="label">Status:</span>
            <span className="value"> {status}</span>
          </div>
          <div className="item first-air-date">
            <span className="label">First Air Date:</span>
            <span className="value"> {first_air_date}</span>
          </div>
          <div className="item episode-run-time">
            <span className="label">Episode Run Time:</span>
            <span className="value"> {episode_run_time}</span>
          </div>
          <div className="item in_production">
            <span className="label">In Production:</span>
            <span className="value"> {in_production}</span>
          </div>
          <div className="item number_of_seasons">
            <span className="label">Number Of Seasons:</span>
            <span className="value"> {number_of_seasons}</span>
          </div>
          <div className="item number_of_episodes">
            <span className="label">Number Of Episodes:</span>
            <span className="value"> {number_of_episodes}</span>
          </div>
          <div className="item origin">
            <span className="label">Origin Country:</span>
            <span className="value"> {origin_country}</span>
          </div>
          <a className="item homepage text-animation" href={homepage} target="blank">Visit</a>
        </div>
      
      </div>

      <div className="details-modal-networks">
        <p className="item-heading text-animation">Networks</p>
        <div className="members">
          {networks && networks.map((network, index)=>{
            return <div className="member" key={network.id}><img className="image" src={images_api+network.logo_path} alt={network.name}></img></div>
          })}
        </div>
      </div>

      <div className="details-modal-cast-and-crew">
        <div className="item-heading text-animation">Cast and Crew</div>
        {cast!==0 &&
        <div className="item cast">
          <div className="heading text-animation">Cast</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.known_for_department==="Acting" && member.character) && 
                <Member key={member.credit_id} name={member.name} role="Actor" image={member.profile_path} character={member.character}/>
              );
            })}
          </div>
        </div>}
        {(directors!==0 || created_by) &&
        <div className="item directors">
          <div className="heading text-animation">Directors</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.job === "Director" || member.department==="Directing") && 
                <Member key={member.credit_id} name={member.name} role={member.job} image={member.profile_path}/>
              );
            })}
            {created_by && created_by.map((member, index)=>{
              return (
                <Member key={member.credit_id} name={member.name} role={member.job} image={member.profile_path}/>
              );
            })}
          </div>
        </div>}
        {producers!==0 &&
        <div className="item producers">
          <div className="heading text-animation">Producers</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.job && member.job.includes("Producer")) && 
                <Member key={member.credit_id} name={member.name} role={member.job} image={member.profile_path}/>
              );
            })}
          </div>
        </div>}
        {writers!==0 &&
        <div className="item writers">
        <div className="heading text-animation">Writers</div>
          <div className="members">
            {team && team.map((member, index)=>{
              return (
                (member.department==="Writing") && 
                <Member key={member.credit_id} name={member.name} role="Writer" character={member.job} image={member.profile_path}/>
              );
            })}
          </div>
        </div>}
      </div>

    </div>
    </>
  )
}

export default TV