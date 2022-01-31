import { useState, FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { RESULT_SCREEN } from "../../const/MatrixConst";
import { MatrixTable } from "../organize/MatrixTable";
import { ResultMatrixTable } from "../organize/ResultMatrixTable";
import { Dispatch } from "react";

type Props = {
  setComplete: Dispatch<React.SetStateAction<boolean>>;
};

export const Matrix: FC<Props> = (props) => {
  console.log("Matrixが実行されました");
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
    <>
      <MatrixTable />
      <ResultMatrixTable />
      <Button
        sx={{ mt: 1, mb: 1 }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        クリアする
      </Button>
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
    </>
  );
};
