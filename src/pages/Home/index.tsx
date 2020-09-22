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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";

import { useHomeStyles } from "./theme";
import { Tweet } from "../../components/Tweet";
import { SideMenu } from "../../components/SideMenu";
import { AddTweetForm } from "../../components/AddTweetForm";
import { SearchTextField } from "../../components/SearchTextField";

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid sm={1} md={3} item>
          <SideMenu classes={classes} />
        </Grid>
        <Grid sm={8} md={6} item>
          <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
              <Typography variant="h6">Главная</Typography>
            </Paper>
            <Paper>
              <div className={classes.addForm}>
                <AddTweetForm classes={classes} />
              </div>
              <div className={classes.addFormBottomLine} />
            </Paper>
            {[
              ...new Array(20).fill(
                <Tweet
                  text="The following npm package, @material-ui/icons, includes the 1,100+ official Material icons converted to SvgIcon components."
                  classes={classes}
                  user={{
                    fullname: "Alex Norvag",
                    username: "nxrvlg",
                    avatarUrl:
                      "https://sun9-70.userapi.com/c625831/v625831627/b6d5/dlw-cJw2PTk.jpg",
                  }}
                />
              ),
            ]}
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
            <Paper className={classes.rightSideBlock}>
              <Paper
                className={classes.rightSideBlockHeader}
                variant="outlined"
              >
                <b>Актуальные темы</b>
              </Paper>
              <List>
                <ListItem className={classes.rightSideBlockItem}>
                  <ListItemText
                    primary="Санкт-Петербург"
                    secondary={
                      <Typography component="span" variant="body2">
                        Твитов: 3 331
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem className={classes.rightSideBlockItem}>
                  <ListItemText
                    primary="#коронавирус"
                    secondary={
                      <Typography component="span" variant="body2">
                        Твитов: 163 122
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem className={classes.rightSideBlockItem}>
                  <ListItemText
                    primary="Беларусь"
                    secondary={
                      <Typography component="span" variant="body2">
                        Твитов: 163 122
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </List>
            </Paper>
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
