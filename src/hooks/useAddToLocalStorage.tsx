import { Dispatch } from "react";
import { FormEvent } from "react";

import { useFormValidation } from "../hooks/useFormValidation";
import { ChipInfomation } from "../types/ChipInfomation";
import { Members } from "../types/Members";

type Props = {
  members: Members;
  kaeshi: number;
  chipInfomation: ChipInfomation;
  setMembers: Dispatch<React.SetStateAction<Members>>;
  onSettingComplate: () => void;
  handleClickOpen: () => void;
  setModalMessage: Dispatch<React.SetStateAction<string>>;
};

export const useAddToLocalStorage = () => {
  const { settingFormValidation } = useFormValidation();

  const addToLocalStorage = async (e: FormEvent, props: Props) => {
    e.preventDefault();
    const {
      members,
      kaeshi,
      chipInfomation,
      setMembers,
      onSettingComplate,
      handleClickOpen,
      setModalMessage,
    } = props;

    const { check, message } = await settingFormValidation({
      members: members,
      kaeshi: kaeshi,
      chipInfomation: chipInfomation,
    });
    let updateMembers = members;
    if (members.member4 === "") {
      updateMembers = { ...members, member4: "無し" };
      setMembers({ ...members, member4: "無し" });
    }

    if (!check) {
      setModalMessage(message);
      handleClickOpen();
      return;
    }

    localStorage.setItem("Kaeshi", JSON.stringify(kaeshi)); //JSON.stringifyで文字列に変換することでオブジェクトも保存できる
    localStorage.setItem("Chip", JSON.stringify(chipInfomation));
    localStorage.setItem("Members", JSON.stringify(updateMembers));
    onSettingComplate();
  };

  return { addToLocalStorage };
};
