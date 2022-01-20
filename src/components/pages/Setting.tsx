import { FC, FormEvent, useState, ChangeEvent, SyntheticEvent } from "react";

import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
// import { useFormValidation } from "../../hooks/useFormValidation";
import { useAddToLocalStorage } from "../../hooks/useAddToLocalStorage";

const M_Typography = styled(Typography)({
  marginTop: "1em",
});

type Props = {
  onSettingComplate: () => void;
};

export const Setting: FC<Props> = (props) => {
  const { onSettingComplate } = props;
  // const { settingFormValidation } = useFormValidation();
  const { addToLocalStorage } = useAddToLocalStorage();
  const [kaeshi, setKaeshi] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [chipInfomation, setChipInfomation] = useState({
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
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">設定</Typography>
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
        <Typography sx={{ mb: 1 }}>対戦相手</Typography>
        <Grid container columns={2} direction="column">
          <TextField
            id="standard-basic"
            label="1人目"
            variant="standard"
            value={members.member1}
            name="member1"
            onChange={onSetMembers}
            sx={{ mb: 1 }}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="2人目"
            variant="standard"
            value={members.member2}
            name="member2"
            onChange={onSetMembers}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="3人目"
            variant="standard"
            value={members.member3}
            name="member3"
            onChange={onSetMembers}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="4人目"
            variant="standard"
            value={members.member4}
            name="member4"
            onChange={onSetMembers}
          />
        </Grid>

        <M_Typography>返し</M_Typography>
        <Input
          type="number"
          name="member4"
          // onChange={onChipTotal}
          onChange={(e) => setKaeshi(Number(e.target.value))}
          endAdornment={<InputAdornment position="end">点</InputAdornment>}
        />
        <M_Typography>チップ</M_Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value={true}
            checked={chipInfomation.hasChip}
            onChange={onSetChip}
            name="hasChip"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value={false}
            checked={!chipInfomation.hasChip}
            onChange={onSetChip}
            name="hasChip"
          />
        </FormGroup>
        {chipInfomation.hasChip && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ alignItems: "center", mt: 2 }}>
              {/* <Grid xs={2}>配布数</Grid> */}
              <Grid>
                <InputLabel>配布数</InputLabel>
                <Input
                  type="number"
                  name="total"
                  onChange={onChipInformation}
                  endAdornment={
                    <InputAdornment position="end">枚</InputAdornment>
                  }
                />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center", mt: 2 }}>
              <Grid>
                <InputLabel>金額</InputLabel>
                <Input
                  type="number"
                  name="money"
                  onChange={onChipInformation}
                  endAdornment={
                    <InputAdornment position="end">枚</InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}
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
        <DialogTitle id="alert-dialog-title">{"エラー"}</DialogTitle>
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
