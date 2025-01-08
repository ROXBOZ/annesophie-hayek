import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useAnimateElements } from "@/lib/gsap";

type Language = "fr" | "en";
type Action =
  | "default"
  | "backward"
  | "forward"
  | "play"
  | "pause"
  | "read"
  | "translation";

const AudioPlayer = ({
  audioUrl,
  audioDescription,
  lang,
}: {
  lang: "en" | "fr";
  audioUrl: string;
  audioDescription: {
    fr: TypedObject | TypedObject[];
    en: TypedObject | TypedObject[];
  };
}) => {
  useAnimateElements();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play/Pause logic
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch((err) => console.error("Error playing audio:", err));
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
        className="fixed bottom-0 left-0 right-0 top-0 z-50 flex justify-center bg-gradient-to-b from-teal-950/80 to-blue-950/80 p-4 lg:items-center"
      >
        <div className="relative min-h-[50vh] w-full overflow-hidden rounded-xl bg-white px-12 pb-24 pt-12 md:w-1/2">
          <button
            className="fixed right-6 top-6 flex aspect-square rounded-full p-3 ring-inset ring-primary-50 transition-all delay-200 hover:ring active:bg-primary-50 md:absolute"
            onClick={() => setShowModal(false)}
          >
            <span className="leading-3">✕</span>
            <span className="sr-only">Close</span>
          </button>
          <div className="mx-auto flex max-w-[65ch] flex-col gap-1">
            <h2 className="pb-4 text-2xl">
              {lang === "fr" ? "Description audio" : "Audio Translation"}
            </h2>
            <PortableText value={audioDescription[lang]} />
          </div>
        </div>
      </div>
    );
  };

  const PlayerButton = ({
    onClickFunction,
    action,
    isActive = false,
  }: {
    onClickFunction: () => void;
    action: Action;
    isActive?: boolean;
  }) => {
    const translations: Record<Language, Record<Action, string>> = {
      fr: {
        default: "",
        backward: "Retour 10 sec.",
        forward: "Avancer 10 sec.",
        play: "Jouer",
        pause: "Pause",
        read: "Transcription",
        translation: "Traduction",
      },
      en: {
        default: "",
        backward: "Backward 10 sec.",
        forward: "Forward 10 sec.",
        play: "Play",
        pause: "Pause",
        read: "Read",
        translation: "Translation",
      },
    };

    const actionLabel = translations[lang][action];

    return (
      <div className="group relative flex justify-center">
        <div className="absolute -mt-4 hidden whitespace-nowrap rounded-md bg-primary-700 px-2 text-xs font-semibold text-primary-50 md:group-hover:flex">
          {actionLabel}
        </div>
        <button
          onClick={onClickFunction}
          className="group flex size-12 items-center justify-center"
        >
          <div
            className={`flex aspect-square size-8 items-center justify-center rounded-full ${
              isActive
                ? "bg-primary-300"
                : "group-active:primary-300 md:group-active:primary-400 bg-primary-200 group-hover:bg-primary-300"
            }`}
          >
            <Image
              src={`/SVGs/${action}.svg`}
              alt={action}
              width={32}
              height={32}
              className="size-[16px] object-contain"
              priority
            />
          </div>
        </button>
      </div>
    );
  };

  PlayerButton.displayName = "PlayerButton";

  return (
    <>
      {showModal && <Modal />}
      <div className="flex flex-col items-center">
        <div className="flex w-full">
          <div className="ml-8 flex flex-grow items-center justify-center">
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
          <div className="group relative -mr-2">
            <PlayerButton
              onClickFunction={() => setShowModal((prev) => !prev)}
              action={lang === "fr" ? "read" : "translation"}
            />
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex w-full items-center justify-center gap-3">
          <input
            type="range"
            value={currTime}
            min={0}
            max={1}
            step={0.01}
            className="range-input bg-transparent"
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={(e) => {
              setIsSeeking(false);
              updateCurrTime(parseFloat(e.currentTarget.value));
            }}
            onChange={(e) => setCurrTime(parseFloat(e.currentTarget.value))}
          />
          <div className="text-xs">
            {audioRef.current
              ? formatDuration(currTime * audioRef.current.duration)
              : "0:00"}
          </div>
        </div>

        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={(e) => {
            if (!isSeeking) {
              const audio = e.currentTarget;
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
