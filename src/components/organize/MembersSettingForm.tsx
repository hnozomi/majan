import { ChangeEvent, FC } from "react";

import { Grid, Typography, TextField } from "@mui/material";

import { SETTING } from "../../const/SettingConst";
import { Members } from "../../types/Members";

type Props = {
  members: Members;
  onSetMembers: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const MembersSettingForm: FC<Props> = (props) => {
  const { members, onSetMembers } = props;
  return (
    <>
      <Typography sx={{ mb: 1 }}>{SETTING.title1}</Typography>
      <Grid container columns={2} direction="column">
        <TextField
          sx={{ mb: 1 }}
          id="standard-basic"
          label="1人目"
          variant="standard"
          value={members.member1}
          name="member1"
          onChange={onSetMembers}
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
    </>
  );
};
