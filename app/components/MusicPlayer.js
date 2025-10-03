import React, { useRef, useEffect, useState } from 'react';



export default function MusicPlayer({ autoPlay = false }) {

  const [isClient, setIsClient] = useState(false);

  const [hasStarted, setHasStarted] = useState(false);

  const audioRef = useRef(null);



  useEffect(() => {

    // 1. Initial Client Setup

    setIsClient(true);

    if (audioRef.current) {

      audioRef.current.volume = 0.4;

    }

  }, []);



  // 2. Control Playback based on autoPlay prop

  useEffect(() => {

    if (isClient && audioRef.current && autoPlay && !hasStarted) {



      // FIX: Add a small delay (e.g., 50ms) to ensure the user interaction is fully registered by the browser.

      const playTimeout = setTimeout(() => {

        audioRef.current.play().then(() => {

          setHasStarted(true);

        }).catch(error => {

          console.error("Autoplay failed after delay:", error);

          // If it fails even with a delay, the browser environment is highly restricted.

        });

      }, 50); // 50 milliseconds delay



      // Cleanup function to clear the timeout if the component unmounts quickly

      return () => clearTimeout(playTimeout);

    }

  }, [autoPlay, isClient, hasStarted]);



  if (!isClient) {

    return null;

  }



  return (

    <audio ref={audioRef} src="/bday.mp3" loop />

  );

}