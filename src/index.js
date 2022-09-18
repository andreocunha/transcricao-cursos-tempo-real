import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TranscriptionProvider } from './context/transcription'
import { VideoProvider } from './context/video'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VideoProvider>
      <TranscriptionProvider>
        <App />
      </TranscriptionProvider>
    </VideoProvider>
  </React.StrictMode>
);
