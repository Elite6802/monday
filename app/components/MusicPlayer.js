'use client';
import React, { useRef, useEffect, useState } from 'react';

// This component receives the 'startPlayback' prop from the parent component
export default function MusicPlayer({ startPlayback = false }) {
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef(null);

  // Flag to ensure we don't try to play the song multiple times
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    // 1. Initial Client Setup
    setIsClient(true);

    // Set up volume and event listener once on mount
    if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.loop = false; // <<< CRITICAL: Ensure it only plays once

        // Listen for the song to end (optional)
        audioRef.current.onended = () => {
            console.log("Song finished playing.");
            // You could set state here to show a "Play Again?" button if needed
        };
    }
  }, []); // Runs ONLY ONCE on mount

  // 2. Control Playback based on startPlayback prop
  useEffect(() => {
    // Only proceed if it's the client side, the audio element exists,
    // the parent says to start, AND it hasn't played through this effect yet.
    if (isClient && audioRef.current && startPlayback && !hasPlayedOnce) {

      audioRef.current.play()
        .then(() => {
          // Success: Mark as played to prevent future attempts from this effect
          setHasPlayedOnce(true);
          console.log("Music started successfully on user click.");
        })
        .catch(error => {
          // This catches errors like the user scrolling causing a re-render
          // that tries to play, which the browser might block.
          console.error("Audio playback failed:", error);
        });
    }
  }, [startPlayback, isClient, hasPlayedOnce]);

  if (!isClient) {
    return null;
  }

  return (
    // CRITICAL: Remove the 'loop' attribute from the <audio> tag here
    <audio ref={audioRef} src="/bday.mp3" />
  );
}