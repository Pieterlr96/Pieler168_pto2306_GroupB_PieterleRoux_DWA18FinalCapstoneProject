import PropTypes from 'prop-types';

// Define the Navbar component
const Navbar = ({ onNavigate }) => {
  // Function to handle navigation to different pages
  const handleNavigation = (page) => {
    // Call the 'onNavigate' function passed as a prop with the selected page
    onNavigate(page);
  };

  // Render the Navbar component
  return (
    <div className="navbar-container">
      {/* Button to navigate to the 'home' page */}
      <button onClick={() => handleNavigation('home')}>Home</button>
      {/* Button to navigate to the 'favorite' page */}
      <button onClick={() => handleNavigation('favorite')}>Favorites</button>
      {/* Button to navigate to the 'preview' page */}
      <button onClick={() => handleNavigation('preview')}>Preview</button>
      {/* Button to navigate to the 'history' page */}
      <button onClick={() => handleNavigation('history')}>History</button>
    </div>
  );
};

// Prop type validation for the 'onNavigate' prop
Navbar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

// Export the Navbar component as the default export
export default Navbar;

//This component provides navigation buttons for different sections of the app.
//Users can easily switch between the Home, Favorites, Preview, and History pages.
//It helps users quickly access different functionalities without navigating through complex menus.