import { createContext, useContext, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { VideoContext } from "./video";

export const TranscriptionContext = createContext({});

export function TranscriptionProvider({ children }) {
  const {
      transcript,
      finalTranscript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [transcricoes, setTranscricoes] = useState([]);
  const [timeTranscript, setTimeTranscript] = useState(0);
  const [isNewTranscript, setIsNewTranscript] = useState(false);
  const { getVideoTime } = useContext(VideoContext)

  function startTranscription() {
    SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
    if(isNewTranscript === false) {
      setTimeTranscript(getVideoTime());
      setIsNewTranscript(true);
    }
  }

  function stopTranscription() {
    SpeechRecognition.stopListening();
  }

  function saveTranscription(text) {
    if(text !== '') {
      setTranscricoes((transcricoes) => [...transcricoes, {
        text: text,
        time: timeTranscript,
      }]);
    }
    setIsNewTranscript(false);
  }

  return (
    <TranscriptionContext.Provider
      value={{
        transcript,
        finalTranscript,
        listening,
        browserSupportsSpeechRecognition,
        transcricoes,
        resetTranscript,
        startTranscription,
        stopTranscription,
        saveTranscription,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
}