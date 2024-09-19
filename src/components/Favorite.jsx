import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Favorite = ({ favorites, setFavorites }) => {
  // Initialize local state for managing favorites, search term, and sort order
  const [localFavorites, setLocalFavorites] = useState(favorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order is ascending

  // Function to remove an episode from favorites
  const removeFromFavorites = (episode) => {
    setLocalFavorites((prevFavorites) =>
      prevFavorites.filter((favEpisode) => favEpisode !== episode)
    );
  };

  // Effect hook to update the 'favorites' state in the parent component when 'localFavorites' changes
  useEffect(() => {
    setFavorites(localFavorites);
  }, [localFavorites, setFavorites]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); //The function retrieves the current value of an input element 
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filter and sort the favorite episodes based on search term and sort order
  const filteredAndSortedFavorites = localFavorites
    .filter((episode) =>
      episode.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc' || sortOrder === 'desc') {
        const titleComparison = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? titleComparison : -titleComparison;
      } else if (sortOrder === 'asc-date' || sortOrder === 'desc-date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc-date' ? dateA - dateB : dateB - dateA;
      }
    });

  // Render the Favorite component
  return (
    <div className="favorite-container">
      <h1>Your Favorites</h1>
      <div className="favorite-controls">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Dropdown for sorting */}
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
          <option value="asc-date">Sort Ascending Date</option>
          <option value="desc-date">Sort Descending Date</option>
        </select>
      </div>
      {/* Render favorite episodes */}
      {filteredAndSortedFavorites.length > 0 ? (
        filteredAndSortedFavorites.map((episode, index) => (
          <div key={index} className="favorite-item">
            <h3>{episode.title}</h3>
            <h4>{episode.season}</h4>
            <p>{episode.description}</p>
            <button onClick={() => removeFromFavorites(episode)}>Remove from Favorites</button>
          </div>
        ))
      ) : (
        <p>No favorite episodes found.</p>
      )}
    </div>
  );
};

// Prop type validation : ensures that the props being passed to a component adhere to the expected data types and requirements
Favorite.propTypes = {
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default Favorite;

//Displays a user's favorite episodes.
//Users can remove episodes from their favorites.
//Provides search and sorting options to manage favorites efficiently.