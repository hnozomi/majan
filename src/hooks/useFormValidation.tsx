import { ChipInfomation } from "../types/ChipInfomation";
import { Members } from "../types/Members";

type Props = {
  members: Members;
  kaeshi: number;
  chipInfomation: ChipInfomation;
};

export const useFormValidation = () => {
  console.log("useFormValidation");
  const settingFormValidation = async (props: Props) => {
    const { members, kaeshi, chipInfomation } = props;
    if (
      members.member1 === "" ||
      members.member2 === "" ||
      members.member3 === ""
    ) {
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

  console.log("settingFormValidation");

  return { settingFormValidation };
};
