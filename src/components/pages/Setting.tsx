import { FC, FormEvent, useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ChangeEvent } from "react";
import { FormEventHandler } from "react";
import { SyntheticEvent } from "react";
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
  const [chip, setChip] = useState("チップあり");
  const [yakitori, setYakitori] = useState("焼き鳥あり");
  const [tobi, setTobi] = useState("飛び賞あり");
  const [chipcheck, setChipCheck] = useState(false);
  const [yakitoricheck, setYakitoriCheck] = useState(false);
  const [tobicheck, setTobiCheck] = useState(false);

  const [rule, setRule] = useState({
    chip: "チップあり",
    yakitori: "焼き鳥あり",
    tobi: "飛び賞あり",
  });

  const onChangeChip = (e: SyntheticEvent<EventTarget>) => {
    const targetValue = e.target as HTMLInputElement;
    setChip(targetValue.value);
    setChipCheck(!chipcheck);
  };
  const onChangeYakitori = (e: SyntheticEvent<EventTarget>) => {
    const targetValue = e.target as HTMLInputElement;
    setYakitori(targetValue.value);
    setYakitoriCheck(!yakitoricheck);
  };
  const onChangeTobi = (e: SyntheticEvent<EventTarget>) => {
    const targetValue = e.target as HTMLInputElement;
    setTobi(targetValue.value);
    setTobiCheck(!tobicheck);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onComplate();
    localStorage.setItem("Member1", members.first);
    localStorage.setItem("Member2", members.second);
    localStorage.setItem("Member3", members.third);
    localStorage.setItem("Member4", members.fourth);
    localStorage.setItem("chip", chip);
    localStorage.setItem("yakitori", yakitori);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const number = e.target.name;
    const tempMembers = { ...members, [number]: e.target.value };
    setMembers(tempMembers);
  };

  const onLocalStorageClear = () => {
    localStorage.removeItem("Member1");
    localStorage.removeItem("Member2");
    localStorage.removeItem("Member3");
    localStorage.removeItem("Member4");
    localStorage.removeItem("yakitori");
    localStorage.removeItem("chip");
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

      <form onSubmit={onSubmit}>
        <Typography sx={{ mb: 1 }}>対戦相手</Typography>
        <Grid container columns={2} direction="column">
          <TextField
            id="standard-basic"
            label="1人目"
            variant="standard"
            value={members.first}
            name="first"
            onChange={onChange}
            sx={{ mb: 1 }}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="2人目"
            variant="standard"
            value={members.second}
            name="second"
            onChange={onChange}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="3人目"
            variant="standard"
            value={members.third}
            name="third"
            onChange={onChange}
          />
          <TextField
            sx={{ mb: 1 }}
            id="standard-basic"
            label="4人目"
            variant="standard"
            value={members.fourth}
            name="fourth"
            onChange={onChange}
          />
        </Grid>

        {/* <Typography sx={{ mt: 2 }}>チップ</Typography> */}
        <M_Typography>チップ</M_Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value="チップあり"
            checked={!chipcheck}
            onChange={onChangeChip}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value="チップなし"
            checked={chipcheck}
            onChange={onChangeChip}
          />
        </FormGroup>
        {/* <Typography sx={{ mt: 2 }}>焼き鳥</Typography> */}
        <M_Typography>焼き鳥</M_Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value="焼き鳥あり"
            checked={!yakitoricheck}
            onChange={onChangeYakitori}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value="焼き鳥なし"
            checked={yakitoricheck}
            onChange={onChangeYakitori}
          />
        </FormGroup>
        <M_Typography>飛び賞</M_Typography>
        {/* <Typography sx={{ mt: 2 }}>飛び賞</Typography> */}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="あり"
            value="飛び賞あり"
            checked={!tobicheck}
            onChange={onChangeTobi}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="なし"
            value="飛び賞なし"
            checked={tobicheck}
            onChange={onChangeTobi}
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
