import { useEffect, useRef, useState } from "react";

import Image from "next/image";

const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [newTime, setNewTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Effect to play/pause audio
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const updateCurrTime = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value * audio.duration;
    }
  };

  const PlayerButton = ({
    onClickFunction,
    action,
  }: {
    onClickFunction: () => void;
    action: string;
  }) => {
    return (
      <button
        onClick={onClickFunction}
        className="flex aspect-square h-auto rounded-full bg-primary-200 p-2 ring-inset ring-primary-300 transition-all delay-100 hover:ring active:bg-primary-300"
      >
        <Image
          src={`SVGs/${action}.svg`}
          alt={action}
          width={500}
          height={500}
          className="size-3"
        />
      </button>
    );
  };

  const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        {/* Backward Button */}
        <PlayerButton
          onClickFunction={() => {
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = Math.max(audio.currentTime - 10, 0);
            }
          }}
          action="backward"
        />

        {/* Play/Pause Button */}
        <PlayerButton
          onClickFunction={() => setIsPlaying(!isPlaying)} // Toggle play/pause
          action={isPlaying ? "pause" : "play"}
        />

        {/* Forward Button */}
        <PlayerButton
          onClickFunction={() => {
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = Math.min(
                audio.currentTime + 10,
                audio.duration,
              );
            }
          }}
          action="forward"
        />
      </div>

      {/* Seek Bar */}
      <div className="flex w-full items-center justify-center gap-3">
        <input
          type="range"
          value={!isSeeking ? currTime : newTime}
          min={0}
          max={1}
          step={0.01}
          className="range-input mix-blend-multiply"
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={(e) => {
            setIsSeeking(false);
            updateCurrTime(parseFloat(e.currentTarget.value));
          }}
          onChange={(e) => {
            setNewTime(parseFloat(e.currentTarget.value));
          }}
        />

        <div className="text-xs">1:16</div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          if (!isSeeking) {
            setCurrTime(audio.currentTime / audio.duration);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
