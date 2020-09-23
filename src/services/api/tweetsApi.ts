import axios from "axios";
import { Tweet, TweetsState } from "../../store/ducks/tweets/contracts/state";

export const TweetsApi = {
  async fetchTweets(): Promise<TweetsState["items"]> {
    const { data } = await axios.get("/tweets");
    return data;
  },
  async fetchTweetData(id: string): Promise<Tweet[]> {
    console.log('id: ', id)
    const { data } = await axios.get("/tweets?_id=" + id);
    return data;
  },
};
