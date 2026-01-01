export function translatePotentialSavings(responseText) {
  if (!responseText) return "לא נמצא נתון";
  let answerString;
  answerString = responseText.includes("Root document took") ? "המסמך הראשי לקח" : "חסכון פוטנציאלי של" ;

  const numAndUnit = getNumberAndUnit(responseText);
  if(numAndUnit){
    return answerString + " " + numAndUnit;
  }
  return responseText;
}

function getNumberAndUnit(responseText) {
  const regex = /(\d+(?:\.\d+)?)\s*([a-zA-Z]+(?:\/[a-zA-Z]+)?)/;
  const match = responseText.match(regex);

  if (match) {
    const number = match[1];
    const unit = match[2];
    return number + " " + unit;
  }
  return false;
}
