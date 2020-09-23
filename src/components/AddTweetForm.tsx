import React from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  TextareaAutosize,
} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import classNames from "classnames";
import { useHomeStyles } from "../pages/Home/theme";
import { useDispatch } from "react-redux";
import { fetchAddTweet } from "../store/ducks/tweets/actionCreators";

interface AddTweetFormProps {
  classes: ReturnType<typeof useHomeStyles>;
  maxRows?: number;
}

const MAX_LENGTH = 280;

export const AddTweetForm: React.FC<AddTweetFormProps> = ({
  classes,
  maxRows,
}: AddTweetFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>("");
  const textLimitPercent = Math.round((text.length / MAX_LENGTH) * 100);
  const textCount = MAX_LENGTH - text.length;

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };

  const handleClickAddTweet = (): void => {
    dispatch(fetchAddTweet(text)); 
    setText("");
  };

  return (
    <div className={classes.addForm}>
      <div className={classes.addFormBody}>
        <Avatar
          className={classes.tweetAvatar}
          alt="User avatar"
          src="https://sun9-70.userapi.com/c625831/v625831627/b6d5/dlw-cJw2PTk.jpg"
        />
        <TextareaAutosize
          onChange={handleChangeTextarea}
          className={classes.addFormTextArea}
          placeholder="Что происходит?"
          value={text}
          rowsMax={maxRows}
        />
      </div>
      <div className={classes.addFormBotton}>
        <div
          className={classNames(
            classes.tweetFooter,
            classes.addFormBottomActions
          )}
        >
          <IconButton color="primary">
            <ImageOutlinedIcon style={{ fontSize: 26 }} />
          </IconButton>
          <IconButton color="primary">
            <EmojiIcon style={{ fontSize: 26 }} />
          </IconButton>
        </div>
        <div className={classes.addFormBottomRight}>
          {text && (
            <>
              <span>{textCount}</span>
              <div className={classes.addFormCircleProgress}>
                <CircularProgress
                  variant="static"
                  size={20}
                  thickness={5}
                  value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                  style={
                    text.length >= MAX_LENGTH ? { color: "red" } : undefined
                  }
                />
                <CircularProgress
                  style={{ color: "rgba(0, 0, 0, 0.1)" }}
                  variant="static"
                  size={20}
                  thickness={5}
                  value={100}
                />
              </div>
            </>
          )}
          <Button
            onClick={handleClickAddTweet}
            disabled={text.length >= MAX_LENGTH}
            color="primary"
            variant="contained"
          >
            Твитнуть
          </Button>
        </div>
      </div>
    </div>
  );
};
