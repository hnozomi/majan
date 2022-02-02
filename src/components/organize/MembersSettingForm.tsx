import { ChangeEvent, FC } from "react";

import { styled } from "@mui/system";
import { Grid, Typography, TextField } from "@mui/material";

import { SETTING } from "../../const/SettingConst";
import { Members } from "../../types/Members";

type Props = {
  members: Members;
  onSetMembers: (e: ChangeEvent<HTMLInputElement>) => void;
};

const M_TextField = styled(TextField)({
  marginBottom: "0.5em",
});

export const MembersSettingForm: FC<Props> = (props) => {
  const { members, onSetMembers } = props;

  return (
    <>
      <Typography sx={{ mb: 1 }}>{SETTING.title1}</Typography>
      <Grid container columns={2} direction="column">
        {Object.keys(members).map(
          (
            key, //Object.keyでmemberオブジェクトのキーだけを抜き出し、配列にして返す
            index
          ) => (
            <M_TextField
              key={index}
              label={`${index + 1}人目`}
              variant="standard"
              value={members[key]}
              name={key}
              onChange={onSetMembers}
            />
          )
        )}
      </Grid>
    </>
  );
};
