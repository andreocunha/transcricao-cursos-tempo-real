import './App.css';
import './button.scss';
import { useEffect, useState } from 'react';
import AudioAnalyser from './components/AudioVisualiser/AudioAnalyser';
import VideoInput from './components/VideoInput';
import { TextArea } from './components/TextArea';
import { TranscriptionContext } from './context/transcription';
import { useContext } from 'react';
import { VideoContext } from './context/video';
import { TranscribedCard } from './components/TranscribedCard';

function App() {
  const [microphone, setMicrophone] = useState(null);

  const {
    transcript,
    transcricoes,
    finalTranscript,
    listening,
    resetTranscript,
    startTranscription,
    stopTranscription,
  } = useContext(TranscriptionContext)

  const {
    playVideo,
    pauseVideo,
  } = useContext(VideoContext)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      // console.log(stream);
      setMicrophone(stream);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  // scroll to bottom of textarea className traducaoSimultaneaArea
  useEffect(() => {
    const element = document.querySelector('.traducaoSimultaneaArea');
    element.scrollTop = element.scrollHeight;
  }, [transcript])


  function startPlay() {
    resetTranscript();
    startTranscription();
    playVideo();
  }

  function stopPlay() {
    stopTranscription();
    pauseVideo();
    resetTranscript()
  }

  return (
    <div className="App">
        <h3>Transcrevendo o curso ({listening ? 'on' : 'off'})</h3>

        <div className='Main'>
          <VideoInput width="100%" height={350}/>
          {(microphone && listening) && <AudioAnalyser
            audio={microphone}
          />}
          
          <div className='traducaoSimultaneaContainer'>
            <div class="toolbar" onClick={() => { listening ? stopPlay() : startPlay() }}>
              {
                listening ? 
                (<p class="btn btn_live">Parar transcrição<span class="live-icon"></span></p>)
                :
                (<p class="btn btn_live">Inicia transcrição</p>)
              }
            </div>

            <div className='traducaoSimultaneaArea'>
              <h5>Tradução simultânea</h5>
              <p>{transcript}</p>
            </div>
          </div>
        </div>
        <TextArea value={finalTranscript} />
        
        {transcricoes.length > 0 && (<h4>Transcrições salvas:</h4>)}
        {
          transcricoes.length > 0 &&
          transcricoes.map((transcricao, index) => (
            <TranscribedCard
              key={index}
              data={transcricao}
            />
          ))
        }
        
    </div>
  );
}

export default App;
