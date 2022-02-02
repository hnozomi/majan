import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Input,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent, Dispatch } from "react";
import { SyntheticEvent } from "react";
import { FC } from "react";
import { UNIT } from "../../const/MatrixConst";
import { SETTING } from "../../const/SettingConst";
import { ChipInfomation } from "../../types/ChipInfomation";

const M_Typography = styled(Typography)({
  marginTop: "1em",
});

type Props = {
  setKaeshi: Dispatch<React.SetStateAction<number>>;
  chipInfomation: ChipInfomation;
  onChipInformation: (e: ChangeEvent<HTMLInputElement>) => void;
  onSetChip: (e: SyntheticEvent<EventTarget>) => void;
};

export const RulesSettingForm: FC<Props> = (props) => {
  const { setKaeshi, chipInfomation, onChipInformation, onSetChip } = props;
  return (
    <>
      <M_Typography>{SETTING.title2}</M_Typography>
      <Input
        type="number"
        name="member4"
        onChange={(e) => setKaeshi(Number(e.target.value))}
        endAdornment={
          <InputAdornment position="end">{UNIT.point}</InputAdornment>
        }
      />
      <M_Typography>{SETTING.title3}</M_Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
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
            <Grid>
              <InputLabel>{SETTING.distribution}</InputLabel>
              <Input
                type="number"
                name="total"
                onChange={onChipInformation}
                endAdornment={
                  <InputAdornment position="end">
                    {UNIT.distribution}
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          <Grid container sx={{ alignItems: "center", mt: 2 }}>
            <Grid>
              <InputLabel>{SETTING.cost}</InputLabel>
              <Input
                type="number"
                name="money"
                onChange={onChipInformation}
                endAdornment={
                  <InputAdornment position="end">{UNIT.total}</InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
