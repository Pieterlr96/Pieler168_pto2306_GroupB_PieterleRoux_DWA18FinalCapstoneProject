import { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Preview from './components/Preview';
import Authentication from './components/form';
import Favorite from './components/Favorite';
import History from './components/History';


function App() {
  // State variables for managing the current page, selected podcast, and favorite episodes
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'home');
  const [selectedPodcast, setSelectedPodcast] = useState(
    JSON.parse(localStorage.getItem('selectedPodcast')) || null
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteEpisodes')) || []
  );

  // Function to handle navigation to different pages
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // State variables for listening history and the last listened episode
  const [listeningHistory, setListeningHistory] = useState([]);
  const [setLastListened] = useState(null);
  const [email ,setEmail] = useState('')
const [password ,setPassword] = useState('')
const [isAuthenticated , setIsAuthenticated] = useState(false)

  // Function to handle episode completion and update listening history
  const handleEpisodeComplete = (episode) => {
    if (!listeningHistory.some((item) => item.id === episode.id)) {
      setListeningHistory((prevHistory) => [...prevHistory, episode]);
    }
  };

  // Function to handle episode progress and set last listened episode
  const handleEpisodeProgress = (episode, currentTime) => {
    if (currentTime >= episode.duration - 10) {
      setLastListened({
        show: episode.show,
        episode: episode.title,
        progress: currentTime,
      });
    }
  };

  // Function to handle favorite button click and update favorites
  const handleFavoriteClick = (episode) => {
    if (!favorites.some((fav) => fav.id === episode.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, episode]);
    }
  };

  // Save the current page and selected podcast in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedPodcast', JSON.stringify(selectedPodcast));
  }, [currentPage, selectedPodcast]);

  // Save the favorite episodes in localStorage whenever the favorites change
  useEffect(() => {
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
  }, [favorites]);

  // Add event listener for the beforeunload event to reset the current page when leaving the app
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPage]);

  // Render the App component with conditional rendering based on the current page
  return (
    <>
   { isAuthenticated === false ?  <Authentication
     email={email}
     setEmail={setEmail}
     password={password}
     setPassword={setPassword}
     isAuthenticated={isAuthenticated}
     setIsAuthenticated={setIsAuthenticated}
     /> : <>
     <Navbar onNavigate={handleNavigation} />
      <br />
      <br />
      {currentPage === 'home' && (
        <Home onPodcastClick={setSelectedPodcast} selectedPodcast={selectedPodcast} />
      )}
      {currentPage === 'favorite' && (
        <Favorite favorites={favorites} setFavorites={setFavorites} />
      )}
      {currentPage === 'preview' && (
        <Preview
          podcastId={selectedPodcast?.id}
          onFavoriteClick={handleFavoriteClick}
          onEpisodeComplete={handleEpisodeComplete}
          onEpisodeProgress={handleEpisodeProgress}
         
        />
      )}
      {currentPage === 'history' && <History />}
     
     </>}
    
      

    </>
  );
}

export default App;

//Manages overall app functionality and navigation.
//Uses the Navbar to help users navigate between different sections.
//Provides a seamless experience for users to explore podcasts, manage favorites, and track listening hi