import { FC, FormEvent, useState, ChangeEvent, SyntheticEvent } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const M_Typography = styled(Typography)({
  marginTop: "1em",
});

type Props = {
  onComplate: () => void;
};

export const Setting: FC<Props> = (props) => {
  const { onComplate } = props;
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
    const number = e.target.name;
    const tempMembers = { ...members, [number]: e.target.value }; //[]をつけないと新たにnumberというKeyができる
    console.log(tempMembers);
    setMembers(tempMembers);
  };

  const onLocalStorageAdd = (e: FormEvent) => {
    e.preventDefault();
    onComplate();
    localStorage.setItem("Members", JSON.stringify(members)); //JSON.stringifyで文字列に変換することでオブジェクトも保存できる
    localStorage.setItem("Rules", JSON.stringify(rule));
  };

  const onLocalStorageClear = () => {
    localStorage.removeItem("Members");
    localStorage.removeItem("Rules");
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
    </Box>
  );
};
