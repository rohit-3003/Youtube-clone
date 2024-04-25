import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { YOUTUBE_API_URL } from "../../utils/constants";
import parseData from '../../utils/parseData'
import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const getHomePageVideos = createAsyncThunk(
    "youtubeApp/homePageVideos",
    async (isNext, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos},
        } = getState();
        const response = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`
        );
        const {
            data: { items, nextPageToken },
        } = response;
        const parseDataResult = await parseData(items);
        return { parseData: [...videos, ...parseDataResult], nextPageToken};

    }
);

export default getHomePageVideos;
