import { MessageFirestore } from "_interfaces/messages.interfaces";
import { useEffect, useState } from "react";

const TextContent = ({
  isActive,
  message,
}: {
  isActive?: boolean;
  message: MessageFirestore;
}) => {
  var plainString = message.content.replace(/<[^>]+>/g, "");
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voices = window.speechSynthesis.getVoices();
    const u = new SpeechSynthesisUtterance(plainString);
    u.voice = voices[165];
    u.pitch = 0.6;
    u.rate = 0.95;

    console.log("set up");
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    if (utterance) {
      const synth = window.speechSynthesis;

      synth.resume();
      synth.speak(utterance);
      console.log("triggered");
    }
  }, [utterance]);

  return (
    <div className="h-[800px] w-full flex flex-col">
      <h1 className="font-bold text-2xl text-center">{message.title}</h1>
      <div className="flex-1 flex mt-10 w-full border border-gray-600 rounded-md p-10">
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
    </div>
  );
};

export default TextContent;
