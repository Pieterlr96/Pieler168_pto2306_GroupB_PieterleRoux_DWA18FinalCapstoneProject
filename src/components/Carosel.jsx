import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types"; // Import PropTypes
import { UseContextValue } from "./UseContextValues";

function Fade({ shows }) {
  const { setPhase, setFavourite, setShowImage, setShowDescription, setPhaseState } = UseContextValue();

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePreviewClick = async (show) => {
    if (show.id) {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/<ID>`);
        const data = await response.json();
  
        setPhaseState(prevState => ({
          ...prevState,
          Season: data.seasons,
        }));
        setFavourite(prevState => ({
          ...prevState,
          favouriteShowTitle: show.title,
        }));
        setPhase('seasonPhase');
        setShowImage(show.image);
        setShowDescription(show.description);
      } catch (error) {
        console.error('Error fetching Preview data:', error.message);
        // Optionally show an error message to the user
      }
    }
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {shows.map((show) => (
          <div key={show.id} className="carousel-item">
            <button onClick={() => handlePreviewClick(show)} title={show.title}>
              <img src={show.image} alt={show.title} />
              <p>{show.title}</p>
              <p>Seasons: {show.seasons}</p>
              <p>Genres: {show.genres.map(g => g).join(', ')}</p>
              <p>Updated: {new Date(show.updated).toLocaleDateString('en-GB')}</p>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Define prop types
Fade.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      seasons: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      updated: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Fade;
