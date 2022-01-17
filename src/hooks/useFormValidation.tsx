import { ChipInfomation } from "../types/ChipInfomation";
import { Members } from "../types/Members";

type Props = {
  members: Members;
  kaeshi: number;
  chipInfomation: ChipInfomation;
};

// type Members = {
//   first: string;
//   second: string;
//   third: string;
//   fourth: string;
// };

// type ChipInfomation = {
//   hasChip: boolean;
//   total: number;
//   money: number;
// };

export const useFormValidation = () => {
  const settingFormValidation = async (props: Props) => {
    const { members, kaeshi, chipInfomation } = props;
    if (members.first === "" || members.second === "" || members.third === "") {
      return { check: false, message: "3人は入力してください" };
    }

    if (kaeshi === 0) {
      return { check: false, message: "返し点数を入力してください" };
    }

    if (chipInfomation.hasChip) {
      if (chipInfomation.total === 0) {
        //チップをありにしている時点で0はないため
        return { check: false, message: "チップの配布枚数を入力してください" };
      }
      if (chipInfomation.money === 0) {
        return { check: false, message: "チップの金額を入力してください" };
      }
    }
    return { check: true, message: "問題ありません" };
  };

  return { settingFormValidation };
};
