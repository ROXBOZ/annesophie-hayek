import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useAnimateElements } from "@/lib/gsap";

const AudioPlayer = ({
  audioUrl,
  audioDescription,
}: {
  audioUrl: string;
  audioDescription: TypedObject | TypedObject[];
}) => {
  useAnimateElements();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [newTime, setNewTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const updateCurrTime = useCallback((value: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value * audio.duration;
    }
  }, []);

  const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleBackward = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  }, []);

  const handleForward = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const Modal = () => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setShowModal(false);
      }
    };

    return (
      <div
        ref={modalRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleBackgroundClick}
        className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gradient-to-b from-teal-950/80 to-blue-950/80 p-4"
      >
        <div className="min-h-1/2 relative w-full rounded-xl bg-white px-12 pb-24 pt-12 md:w-1/2">
          <button
            className="absolute right-4 top-4 flex aspect-square rounded-full p-3 ring-inset ring-primary-50 transition-all delay-200 hover:ring active:bg-primary-50"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <span className="leading-3">✕</span>
            <span className="sr-only">fermer</span>
          </button>
          <div className="mx-auto flex max-w-[65ch] flex-col gap-1">
            <h2 className="text-2xl">Audiodescription</h2>
            <PortableText value={audioDescription} />
          </div>
        </div>
      </div>
    );
  };

  // Reusable player button component
  const PlayerButton = ({
    onClickFunction,
    action,
    isActive = false,
  }: {
    onClickFunction: () => void;
    action: string;
    isActive?: boolean;
  }) => {
    return (
      <button
        onClick={onClickFunction}
        className={`anim-el flex aspect-square h-auto rounded-full p-2 outline-teal-500 ring-inset hover:ring hover:transition-all hover:delay-200 focus:outline-4 ${
          isActive
            ? "bg-primary-300 ring-primary-400"
            : "bg-primary-200 ring-primary-300"
        }`}
      >
        <Image
          src={`SVGs/${action}.svg`}
          alt={action}
          width={500}
          height={500}
          className="size-4"
        />
      </button>
    );
  };

  return (
    <>
      {showModal && audioDescription && <Modal />}
      <div className="flex flex-col items-center">
        <div className="flex w-full">
          {/* Playback Controls */}
          <div className="ml-8 flex flex-grow items-center justify-center gap-4">
            <PlayerButton
              aria-label="Backward 10 seconds"
              onClickFunction={handleBackward}
              action="backward"
            />
            <PlayerButton
              aria-label={isPlaying ? "Pause" : "Play"}
              onClickFunction={togglePlayPause}
              action={isPlaying ? "pause" : "play"}
              isActive={isPlaying}
            />
            <PlayerButton
              aria-label="Forward 10 seconds"
              onClickFunction={handleForward}
              action="forward"
            />
          </div>
          <div className="group relative ml-auto mr-1">
            <div className="absolute -right-0 -top-10 rounded bg-primary-200 px-2 py-1 text-xs font-bold opacity-0 transition-opacity delay-300 group-hover:opacity-100">
              Audiodescription
            </div>
            <PlayerButton
              onClickFunction={() => setShowModal((prev) => !prev)}
              action="read"
            />
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex w-full items-center justify-center gap-3">
          <input
            tabIndex={-1}
            type="range"
            value={!isSeeking ? currTime : newTime}
            min={0}
            max={1}
            step={0.01}
            className="anim-el range-input mix-blend-multiply"
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={(e) => {
              setIsSeeking(false);
              updateCurrTime(parseFloat(e.currentTarget.value));
            }}
            onChange={(e) => {
              setNewTime(parseFloat(e.currentTarget.value));
            }}
          />
          <div className="anim-el text-xs">
            {audioRef.current
              ? formatDuration(currTime * audioRef.current.duration)
              : "0:00"}
          </div>
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
    </>
  );
};

export default AudioPlayer;
