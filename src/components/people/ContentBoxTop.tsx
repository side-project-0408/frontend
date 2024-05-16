import IconTextBox from "../common/IconTextBox";
import heartIcon from "../../../public/image/heart.svg";
import eyeIcon from "../../../public/image/eye.svg";
import { GetPeoplesData } from "@/model/peoples";

type Props = {
  data: GetPeoplesData;
};
export default function ContentBoxTop({ data }: Props) {
  return (
    <ul className="flex">
      <li className="flex w-full justify-between">
        <div className="flex items-center gap-1">
          <button onClick={() => console.log("찜하기")}>
            <IconTextBox icon={heartIcon} count={data.favoriteCount} />
          </button>
          <IconTextBox icon={eyeIcon} count={data.viewCount} />
        </div>
      </li>
    </ul>
  );
}
