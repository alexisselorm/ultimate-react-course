
function FinishScreen({points,maxPossiblePoints,highscore,dispatch}) {

  const pointsPercentage = (points/maxPossiblePoints)*100

  let emoji;
  if(pointsPercentage===100) emoji='🥇'
  if(pointsPercentage>=80 && pointsPercentage <100) emoji='🥈'
  if(pointsPercentage>=50 && pointsPercentage <80) emoji='🥉'
  if(pointsPercentage>=0 && pointsPercentage <50) emoji='🐎'
  if(pointsPercentage===0 ) emoji='😪'


  return ( 
    <>
    <p className="result">
      <span>{emoji}</span>
      You scored <strong>{points}</strong> out of {maxPossiblePoints} points ({Math.ceil(pointsPercentage)})%. 
    </p>
    <p className="highscore"><strong>{"Highscore:"+ highscore}</strong></p>
    <button className="btn btn-ui" onClick={()=>dispatch({type:'reset'})}>Restart Quiz</button>
    </>
   );
}

export default FinishScreen;