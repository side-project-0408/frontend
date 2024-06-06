export const convertPositionKorToEng = (posKor: string) => {
  let posEng = "";
  switch (posKor) {
    case "프론트엔드":
      posEng = "frontend";
      break;
    case "백엔드":
      posEng = "backend";
      break;
    case "디자이너":
      posEng = "designer";
      break;
    case "PM":
      posEng = "pm";
      break;
    case "IOS":
      posEng = "ios";
      break;
    case "안드로이드":
      posEng = "android";
      break;
    case "데브옵스":
      posEng = "devops";
      break;
    default:
      posEng = "None";
      break;
  }
  return posEng;
};
