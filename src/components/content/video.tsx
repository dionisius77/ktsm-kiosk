import { MessageFirestore } from "_interfaces/messages.interfaces";
import { useEffect, useRef } from "react";
import { FiMusic } from "react-icons/fi";

const VideoContent = ({
  isActive,
  message,
}: {
  isActive?: boolean;
  message: MessageFirestore;
}) => {
  const videoRef = useRef<any>(null)

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    return () => videoRef.current?.pause();
  }, [isActive]);

  return (
    <div className="h-[800px] w-full flex flex-col">
      <h1 className="font-bold text-2xl text-center">
        {message.title}
      </h1>
      <div className="flex-1 flex items-center justify-center mt-10">
        <video ref={videoRef} loop width={800}>
          <source src={message.content} />
        </video>
      </div>
    </div>
  );
};

export default VideoContent;
