import React from "react";
import {
  Container,
  Grid,
  InputAdornment,
  Paper,
  Typography,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  Button,
  List,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";

import { useHomeStyles } from "./theme";
import { Tweet } from "../../components/Tweet";
import { SideMenu } from "../../components/SideMenu";
import { AddTweetForm } from "../../components/AddTweetForm";
import { SearchTextField } from "../../components/SearchTextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../store/ducks/tweets/actionCreators";
import { fetchTags } from "../../store/ducks/tags/actionCreators";
import {
  selectIsTweetsLoading,
  selectTweetsItems,
} from "../../store/ducks/tweets/selectors";
import { Tags } from "../../components/Tags";
import { Route } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { FullTweet } from "./components/FullTweet";

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectIsTweetsLoading);

  React.useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid sm={1} md={3} item>
          <SideMenu classes={classes} />
        </Grid>
        <Grid sm={8} md={6} item>
          <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
              <Route path="/home/:any">
                <BackButton />
              </Route>

              <Route exact path={["/home", "/home/search"]}>
                <Typography variant="h6">Твиты</Typography>
              </Route>
              <Route path="/home/tweet">
                <Typography variant="h6">Твитнуть</Typography>
              </Route>
            </Paper>

            <Route exact path={["/home", "/home/search"]}>
              <Paper>
                <div className={classes.addForm}>
                  <AddTweetForm classes={classes} />
                </div>
                <div className={classes.addFormBottomLine} />
              </Paper>
            </Route>

            <Route path="/home" exact>
              {isLoading ? (
                <div className={classes.tweetsCentered}>
                  <CircularProgress />
                </div>
              ) : (
                tweets.map((tweet) => (
                  <Tweet key={tweet._id} classes={classes} {...tweet} />
                ))
              )}
            </Route>

            <Route path="/home/tweet/:id" component={FullTweet} exact/>
          </Paper>
        </Grid>
        <Grid sm={3} md={3} item>
          <div className={classes.rightSide}>
            <SearchTextField
              variant="outlined"
              placeholder="Поиск по Твиттеру"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Tags classes={classes} />
            <Paper className={classes.rightSideBlock}>
              <Paper
                className={classes.rightSideBlockHeader}
                variant="outlined"
              >
                <b>Кого читать</b>
              </Paper>
              <List>
                <ListItem className={classes.rightSideBlockItem}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1564866657311-e9cc905d29cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Dock Of Shame"
                    secondary={
                      <Typography component="span" variant="body2">
                        @FavDockOfShame
                      </Typography>
                    }
                  />
                  <Button color="primary">
                    <PersonAddIcon />
                  </Button>
                </ListItem>
                <Divider component="li" />
              </List>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
