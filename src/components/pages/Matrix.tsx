import { Dispatch, useState, FC } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { RESULT_SCREEN } from "../../const/MatrixConst";
import { MatrixTable } from "../organize/MatrixTable";
import { ResultMatrixTable } from "../organize/ResultMatrixTable";

type Props = {
  setComplete: Dispatch<React.SetStateAction<boolean>>;
};

export const Matrix: FC<Props> = (props) => {
  const { setComplete } = props;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onLocalStorageClear = () => {
    localStorage.removeItem("Members");
    localStorage.removeItem("Kaeshi");
    localStorage.removeItem("Chip");
    localStorage.removeItem("Complete");
    setComplete(false);
    setOpen(false);
  };

  return (
    <Box sx={{ m: 1 }}>
      <MatrixTable />
      <ResultMatrixTable />
      <Box sx={{ p: 1, mb: 3 }}>
        <Typography>メンバーやルールを変える場合下記ボタンを押す</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          クリアする
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {RESULT_SCREEN.dialog_title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {RESULT_SCREEN.dialog_message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>いいえ</Button>
          <Button onClick={onLocalStorageClear} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
