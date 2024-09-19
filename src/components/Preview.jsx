import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Define the Preview component
const Preview = ({ podcastId, onFavoriteClick, onEpisodeComplete, onEpisodeProgress }) => {
  // State variables
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);

  // Handle completion of an episode
  const handleEpisodeComplete = () => {
    onEpisodeComplete(podcast);
  };

  // Handle progress update of an episode
  const handleEpisodeProgress = (currentTime) => {
    onEpisodeProgress(podcast, currentTime);
  };

  // Handle favorite button click
  const handleFavoriteClick = () => {
    if (podcast) {
      onFavoriteClick(podcast);
    }
  };

  // Fetch podcast data when the podcastId changes
  useEffect(() => {
    if (podcastId) {
      axios
        .get(`https://podcast-api.netlify.app/id/${podcastId}`)
        .then((response) => {
          setPodcast(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching podcast data:', error);
          setLoading(false);
        });
    }
  }, [podcastId]);

  // Render different UI based on loading and podcast data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!podcast) {
    return <p>No data found for this podcast.</p>;
  }

  // Handle season button click to expand/collapse episodes
  const handleSeasonClick = (season) => {
    setSelectedSeason((prevSeason) => (prevSeason === season ? null : season));
  };

  // Render the Preview component
  return (
    <div className="preview-container">
      {/* Display podcast title and description */}
      <h2>{podcast.title}</h2>
      <p>{podcast.description}</p>
      {/* Render each season and its episodes */}
      {Array.isArray(podcast.seasons) ? (
        podcast.seasons.map((season, index) => (
          <div key={index}>
            {/* Use a button to show/hide episodes for the season */}
            <button onClick={() => handleSeasonClick(season)}>
              <h2>Season: {season.season}</h2>
              <h3>Title: {season.title}</h3>
              <img src={season.image} className="show-image" alt={season.title} />
            </button>
            
            {/* List of episodes for the selected season */}
            <ul className={`episodes-list ${selectedSeason === season ? 'show-episodes' : ''}`}>
              {season.episodes.map((episode, episodeIndex) => (
                <li key={episodeIndex}>
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                  {/* Audio player for the episode */}
                  <audio
                    controls
                    onEnded={handleEpisodeComplete}
                    onTimeUpdate={(e) => handleEpisodeProgress(e.target.currentTime)}
                  >
                    <source src={episode.file} type="audio/mp3" />
                  </audio>
                  {/* Favorite button */}
                  <button onClick={handleFavoriteClick}>Favorite</button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No seasons found for this podcast.</p>
      )}
    </div>
  );
};

// Prop type validation for the Preview component
Preview.propTypes = {
  podcastId: PropTypes.number.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  onEpisodeComplete: PropTypes.func.isRequired,
  onEpisodeProgress: PropTypes.func.isRequired,
};

// Export the Preview component as the default export
export default Preview;

//Shows detailed information about a selected podcast.
//Allows users to listen to episodes, mark them as favorites, and track progress.
//Offers episode completion tracking and progress updates