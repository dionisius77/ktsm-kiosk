import { MessageFirestore } from "_interfaces/messages.interfaces";
import { useEffect } from "react";
import { FiMusic } from "react-icons/fi";

const AudioContent = ({
  isActive,
  message,
}: {
  isActive?: boolean;
  message: MessageFirestore;
}) => {
  const music = new Audio(message.content);

  useEffect(() => {
    if (isActive) {
      music.loop = true;
      music.play();
    } else {
      music.pause();
      music.volume = 0;
      music.loop = false;
      music.currentTime = 0;
    }
    return () => music.pause();
  }, [isActive]);

  return (
    <div className="h-[800px] w-full flex flex-col">
      <h1 className="font-bold text-2xl text-center">
        {message.title}
      </h1>
      <div className="flex-1 flex items-center justify-center">
        <FiMusic className="text-8xl animate-bounce" />
      </div>
    </div>
  );
};

export default AudioContent;
