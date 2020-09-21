import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyleSingIn } from "../pages/SignIn";

interface ModalBlockProps {
  title: string;
  children?: React.ReactNode;
  classes: ReturnType<typeof useStyleSingIn>;
  visible?: boolean;
  onClose: () => void;
}

export const ModalBlock: React.FC<ModalBlockProps> = ({
  title,
  onClose,
  visible = false,
  children,
}): React.ReactElement | null => {
  if (!visible) {
    return null;
  }

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon style={{ fontSize: 26 }} color="secondary" />
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalBlock;
