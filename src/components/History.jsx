import { useState, useEffect } from 'react';

const History = () => {
  // State to store listening history and the last listened episode
  const [listeningHistory, setListeningHistory] = useState(
    JSON.parse(localStorage.getItem('listeningHistory')) || []
  );
  const [lastListened, setLastListened] = useState(
    JSON.parse(localStorage.getItem('lastListened')) || {}
  );

  // Effect to update 'listeningHistory' in local storage when it changes
  useEffect(() => {
    localStorage.setItem('listeningHistory', JSON.stringify(listeningHistory));
  }, [listeningHistory]);

  // Effect to update 'lastListened' in local storage and add to history
  useEffect(() => {
    localStorage.setItem('lastListened', JSON.stringify(lastListened));

    // Create a timer to add to history after 10 minutes of no activity
    const timer = setTimeout(() => {
      if (lastListened.show && lastListened.episode && lastListened.progress) {
        setListeningHistory((prevHistory) => [
          ...prevHistory,
          {
            show: lastListened.show,
            episode: lastListened.episode,
            progress: lastListened.progress,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }, 10 * 60 * 1000);

    // Clean up the timer if component unmounts or 'lastListened' changes
    return () => clearTimeout(timer);

  }, [lastListened]);

  // Function to reset listening history and last listened episode
  const handleResetProgress = () => {
    setListeningHistory([]);
    setLastListened({});
  };

  // Render the History component
  return (
    <div className="history-container">
      <h1>Listening History</h1>
      {listeningHistory.length > 0 ? (
        <ul>
          {listeningHistory.map((episode, index) => (
            <li key={index}>
              <p>Show: {episode.show}</p>
              <p>Episode: {episode.episode}</p>
              <p>Progress: {episode.progress} seconds</p>
              <p>Timestamp: {episode.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listening history found.</p>
      )}
      <button onClick={handleResetProgress}>Reset Listening Progress</button>
    </div>
  );
};

export default History;

//Displays a user's listening history.
//Lists the podcasts and episodes they've listened to, along with progress and timestamps.
//Users can reset their listening history.