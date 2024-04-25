import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseRecommendedData } from "../../utils/parseRecommendedData";
import { YOUTUBE_API_URL } from "../../utils/constants";
const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtubeApp/getRecommendedVideos",
  async (videoId, { getState }) => {
    const state = getState();
    const channelId = state.youtubeApp.currentPlaying.channelInfo.id;
    const response = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );

    const items = response.data.items;
    const parsedData = await parseRecommendedData(items, videoId);

    return { parsedData };
  }
);
