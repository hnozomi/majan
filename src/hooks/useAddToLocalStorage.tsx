import { FormEvent, useState } from "react";

import { useFormValidation } from "../hooks/useFormValidation";
import { ChipInfomation } from "../types/ChipInfomation";
import { Members } from "../types/Members";

type Props = {
  members: Members;
  kaeshi: number;
  chipInfomation: ChipInfomation;
  setMembers: any;
  onSettingComplate: any;
};

export const useAddToLocalStorage = () => {
  const { settingFormValidation } = useFormValidation();
  const [modalMessage, setModalMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addToLocalStorage = async (e: FormEvent, props: Props) => {
    e.preventDefault();
    const { members, kaeshi, chipInfomation, setMembers, onSettingComplate } =
      props;
    const { check, message } = await settingFormValidation({
      members: members,
      kaeshi: kaeshi,
      chipInfomation: chipInfomation,
    });
    if (!check) {
      setModalMessage(message);
      handleClickOpen();
      return;
    }
    if (members.fourth === "") {
      setMembers({ ...members, fourth: "無し" });
    }

    localStorage.setItem("Kaeshi", JSON.stringify(kaeshi)); //JSON.stringifyで文字列に変換することでオブジェクトも保存できる
    localStorage.setItem("Chip", JSON.stringify(chipInfomation));
    localStorage.setItem("Members", JSON.stringify(members));
    onSettingComplate();
  };

  return { addToLocalStorage };
};
