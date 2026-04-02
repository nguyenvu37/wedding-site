"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We wait for the user to interact with the page to start playing automatically,
  // or they can just click the button. Browsers block strict auto-play without interaction.
  useEffect(() => {
    // Khởi tạo volume
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
    }

    const tryPlayAutoplay = async () => {
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.log("Autoplay bị chặn, đợi tương tác:", e);
        }
      }
    };

    // Thử autoplay luôn 1 phát đầu tiên
    tryPlayAutoplay();

    // Nếu thất bại thì đăng ký sự kiện cho bất kỳ cú nhấp chuột/cuộn chuột nào
    const handleFirstInteraction = () => {
      // Gỡ sự kiện liền ngay khi có tương tác đầu tiên
      ["click", "scroll", "touchstart"].forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction);
      });

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Audio play failed on interaction:", error));
      }
    };

    ["click", "scroll", "touchstart"].forEach((event) => {
      window.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      ["click", "scroll", "touchstart"].forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mute trigger if clicked directly
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        autoPlay 
        loop 
        src="/dong-dieu.mp3" 
        preload="auto" 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        onClick={toggleAudio}
        className="fab fixed bottom-5 left-5 z-50 bg-primary text-primary-foreground"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 animate-pulse-soft" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
