import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "_services/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAppSelector } from "redux/hook";
import io from "socket.io-client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ContentType, MessageFirestore } from "_interfaces/messages.interfaces";
import AudioContent from "components/content/audio";
import VideoContent from "components/content/video";
import TextContent from "components/content/text";
import useMessagelMutation from "hooks/message/useMessageMutation";

interface Props {}

const Messages: React.FC<Props> = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [messages, setMessages] = useState<MessageFirestore[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const { readMessage } = useMessagelMutation();

  useEffect(() => {
    getProduct();
    const socketInstance = io(`ws://localhost:3001/?id=${user?.id}`, {
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.info("Connected to server");
    });

    socketInstance.on("message", (data) => {
      console.info(`Received message: ${data}`);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const getProduct = useCallback(async () => {
    const messageRef = collection(db, "messages");
    const q = query(messageRef, where("branchId", "==", user?.id));
    const unsub = onSnapshot(q, (res) => {
      let ids: string[] = [];
      res.docChanges().forEach((change) => {
        if (change.type === "added") {
          ids.push(change.doc.id);
        }
      });
      readMessage.mutate(ids);
      const newData: MessageFirestore[] = res.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as MessageFirestore),
      );
      setMessages(newData);
    });

    return () => {
      unsub();
    };
  }, [user?.id]);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="bg-white p-5 rounded-lg">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 60000 }}
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        centeredSlides={true}
      >
        {messages.map((item, i) => (
          <SwiperSlide
            key={item.id}
            virtualIndex={i}
          >
            {({ isActive }) => {
              if (item.contentType === ContentType.Audio) {
                return isActive ? (
                  <AudioContent
                    isActive={isActive}
                    message={item}
                  />
                ) : null;
              }
              if (item.contentType === ContentType.Video) {
                return isActive ? (
                  <VideoContent
                    isActive={isActive}
                    message={item}
                  />
                ) : null;
              }
              if (item.contentType === ContentType.Text) {
                return isActive ? <TextContent message={item} /> : null;
              }
            }}
          </SwiperSlide>
        ))}
        {messages.length === 0 && (
          <SwiperSlide>
            <div className="w-full h-[800px] flex items-center justify-center text-5xl text-gray-400 text-center">
              No Message Broadcasted
            </div>
          </SwiperSlide>
        )}
        {messages.length > 1 && (
          <div
            className="autoplay-progress"
            slot="container-end"
          >
            <svg
              viewBox="0 0 48 48"
              ref={progressCircle}
            >
              <circle
                cx="24"
                cy="24"
                r="20"
              ></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default Messages;
