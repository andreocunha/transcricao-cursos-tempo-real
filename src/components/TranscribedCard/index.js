
export function TranscribedCard({ data }){
  const { time, text } = data;

  return (
    <div className="TranscribedCard">
      <h3 className="time">{time}</h3>
      <p className="text">{text}</p>
    </div>
  );
}