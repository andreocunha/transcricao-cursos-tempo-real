import { useContext, useEffect, useState } from "react";
import { TranscriptionContext } from "../../context/transcription";

export function TextArea({ value }) {
  const [text, setText] = useState("");
  const { saveTranscription } = useContext(TranscriptionContext)

  useEffect(() => {
    if(text === "") {
      setText(value);
    }
    else {
      setText((text) => text + " " + value);
    }
  }, [value]);

  function saveText(){
    saveTranscription(text);
    setText("");
  }

  return (
    <div className="TextAreaContainer">
      <h4>Área para edição</h4>
      <textarea
        className="TextArea"
        placeholder="Escrava a transcrição aqui..."
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        style={{
          width: '80%',
          height: 150,
          minHeight: 150,
          padding: 10,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 4,
          resize: 'none',
        }}
      />  
      <button onClick={saveText}>Salvar</button>
    </div>
    
  );
}