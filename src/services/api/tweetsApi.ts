import axios from "axios";
import { Tweet, TweetsState } from "../../store/ducks/tweets/contracts/state";

export const TweetsApi = {
  async fetchTweets(): Promise<TweetsState["items"]> {
    const { data } = await axios.get("/tweets?_sort=id&_order=desc");
    return data;
  },
  async fetchTweetData(id: string): Promise<Tweet[]> {
    const { data } = await axios.get("/tweets?_id=" + id);
    return data;
  },
  async addTweet(payload: Tweet): Promise<Tweet> {
    const { data } = await axios.post("/tweets", payload);
    return data;
  },
};
