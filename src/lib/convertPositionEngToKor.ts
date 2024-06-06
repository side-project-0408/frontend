export const convertPositionEngToKor = (posEng: string) => {
  let posKr = "";
  switch (posEng) {
    case "frontend":
      posKr = "프론트엔드";
      break;
    case "backend":
      posKr = "백엔드";
      break;
    case "designer":
      posKr = "디자이너";
      break;
    case "pm":
      posKr = "PM";
      break;
    case "ios":
      posKr = "IOS";
      break;
    case "android":
      posKr = "안드로이드";
      break;
    case "devops":
      posKr = "데브옵스";
      break;
    case "0":
      posKr = "0년";
      break;
    case "1":
      posKr = "1년";
      break;
    case "2":
      posKr = "2년";
      break;
    case "3":
      posKr = "3년";
      break;
    case "4":
      posKr = "4년";
      break;
    case "5":
      posKr = "5년";
      break;
    case "6":
      posKr = "6년";
      break;
    default:
      posKr = "None";
      break;
  }
  return posKr;
};

export default convertPositionEngToKor;
