import { FC, useState, ChangeEvent, SyntheticEvent } from "react";

import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAddToLocalStorage } from "../../hooks/useAddToLocalStorage";

import { SETTING } from "../../const/SettingConst";
import { MembersSettingForm } from "../organize/MembersSettingForm";
import { ChipInfomation } from "../../types/ChipInfomation";
import { RulesSettingForm } from "../organize/RulesSettingForm";

type Props = {
  onSettingComplate: () => void;
};

export const Setting: FC<Props> = (props) => {
  const { onSettingComplate } = props;
  const { addToLocalStorage } = useAddToLocalStorage();
  const [kaeshi, setKaeshi] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [chipInfomation, setChipInfomation] = useState<ChipInfomation>({
    hasChip: false,
    total: 0,
    money: 0,
  });
  const [members, setMembers] = useState({
    member1: "",
    member2: "",
    member3: "",
    member4: "",
  });

  const onSetChip = (e: SyntheticEvent<EventTarget>) => {
    const targetValue = e.target as HTMLInputElement;
    const check = targetValue.value === "true" ? true : false;
    setChipInfomation({ ...chipInfomation, [targetValue.name]: check });
  };

  const onChipInformation = (e: ChangeEvent<HTMLInputElement>) => {
    setChipInfomation({ ...chipInfomation, [e.target.name]: e.target.value });
  };

  const onSetMembers = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const number = e.target.name;
    const tempMembers = { ...members, [number]: e.target.value }; //[]をつけないと新たにnumberというKeyができる
    setMembers(tempMembers);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ m: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">{SETTING.header}</Typography>
      </Box>

      <form
        onSubmit={(e) =>
          addToLocalStorage(e, {
            members: members,
            kaeshi: kaeshi,
            chipInfomation: chipInfomation,
            setMembers: setMembers,
            onSettingComplate: onSettingComplate,
            handleClickOpen: handleClickOpen,
            setModalMessage: setModalMessage,
          })
        }
      >
        <MembersSettingForm members={members} onSetMembers={onSetMembers} />

        <RulesSettingForm
          setKaeshi={setKaeshi}
          chipInfomation={chipInfomation}
          onChipInformation={onChipInformation}
          onSetChip={onSetChip}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" type="submit">
            登録
          </Button>
        </Box>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {SETTING.dialog_title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
