import { FC, FormEvent, useState, ChangeEvent, SyntheticEvent } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const M_Typography = styled(Typography)({
  marginTop: "1em",
});

type Props = {
  onComplate: () => void;
};

export const Setting: FC<Props> = (props) => {
  const { onComplate } = props;
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const [rule, setRule] = useState({
    chip: true,
    yakitori: true,
    tobi: true,
  });

  const onSetRules = (e: SyntheticEvent<EventTarget>) => {
    const targetValue = e.target as HTMLInputElement;
    const check = targetValue.value === "true" ? true : false;
    setRule({ ...rule, [targetValue.name]: check });
  };

  const onSetMembers = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let menberName = "";
    const number = e.target.name;
    console.log(e.target.value);
    console.log(typeof e.target.value);
    e.target.value === " "
      ? (menberName = "無し")
      : (menberName = e.target.value);
    const tempMembers = { ...members, [number]: menberName }; //[]をつけないと新たにnumberというKeyができる
    setMembers(tempMembers);
  };

  const onLocalStorageAdd = async (e: FormEvent) => {
    e.preventDefault();
    let tempMembers;
    const res = await inputCheck();
    if (!res) {
      handleClickOpen();
      return;
    }
    if (members.fourth === "") {
      tempMembers = { ...members, fourth: "無し" };
    }

    localStorage.setItem("Members", JSON.stringify(tempMembers)); //JSON.stringifyで文字列に変換することでオブジェクトも保存できる
    localStorage.setItem("Rules", JSON.stringify(rule));
    onComplate();
  };

  const onLocalStorageClear = () => {
    localStorage.removeItem("Members");
    localStorage.removeItem("Rules");
  };

  const inputCheck = async () => {
    if (members.first === "" || members.second === "" || members.third === "") {
      return false;
    }

    return true;
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
        <Button
          sx={{ mt: 1, mb: 1 }}
          variant="contained"
          onClick={onLocalStorageClear}
        >
          クリアする
        </Button>
      </Box>

      <form onSubmit={onLocalStorageAdd}>
        <Typography sx={{ mb: 1 }}>対戦相手</Typography>
        <Grid container columns={2} direction="column">
          <TextField
            id="standard-basic"
            label="1人目"
            variant="standard"
            value={members.first}
            name="first"
            onChange={onSetMembers}
            sx={{ mb: 1 }}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="2人目"
            variant="standard"
            value={members.second}
            name="second"
            onChange={onSetMembers}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="3人目"
            variant="standard"
            value={members.third}
            name="third"
            onChange={onSetMembers}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="4人目"
            variant="standard"
            value={members.fourth}
            name="fourth"
            onChange={onSetMembers}
          />
        </Grid>

        <M_Typography>チップ</M_Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value={true}
            checked={rule.chip}
            onChange={onSetRules}
            name="chip"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value={false}
            checked={!rule.chip}
            onChange={onSetRules}
            name="chip"
          />
        </FormGroup>
        {rule.chip && <p>チップありです</p>}
        <M_Typography>焼き鳥</M_Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value={true}
            checked={rule.yakitori}
            onChange={onSetRules}
            name="yakitori"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value={false}
            checked={!rule.yakitori}
            onChange={onSetRules}
            name="yakitori"
          />
        </FormGroup>
        <M_Typography>飛び賞</M_Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value={true}
            checked={rule.tobi}
            onChange={onSetRules}
            name="tobi"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value={false}
            checked={!rule.tobi}
            onChange={onSetRules}
            name="tobi"
          />
        </FormGroup>
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
            3人は入力してください
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
