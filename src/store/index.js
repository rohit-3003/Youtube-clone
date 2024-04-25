import { configureStore, createSlice,PayloadAction } from "@reduxjs/toolkit";
import getHomePageVideos  from "./reducers/getHomePageVideos";
import getSearchPageVideos from "./reducers/getSearchPageVideos";
import {getRecommendedVideos} from '../store/reducers/getRecommendedVideos'
import {getVideoDetails} from '../store/reducers/getVideoDetails'

// const 

const YoutubeSlice = createSlice({
    name:"youtubeApp",
    initialState:{
        videos: [],
        currentPlaying: null,
        searchTerm: "",
        searchResults: [],
        nextPageToken: null,
        recommendedVideo: []
    },
    reducers:{
        clearVideo: (state)=>{
            state.videos=[];
            state.nextPageToken=null;
        },
        changeSearchTerm: (state,action)=>{
            state.searchTerm= action.payload
        },
        clearSearchTerm: (state)=>{
            state.searchTerm = ""
        },
        setCurrentPlaying: (state, action) => {
            state.currentPlaying = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
            state.videos = action.payload.parseData;
            state.nextPageToken = action.payload.nextPageToken;
        }).addCase(getSearchPageVideos.fulfilled, (state, action) => {
            state.videos = action.payload.parseData;
            state.nextPageToken = action.payload.nextPageToken;
        }).addCase(getVideoDetails.fulfilled, (state, action) => {
            state.currentPlaying = action.payload;
        }).addCase(getRecommendedVideos.fulfilled, (state, action) => {
            state.recommendedVideo = action.payload.parsedData;
        });
    }
})
 const store= configureStore({
    reducer:{
        youtubeApp: YoutubeSlice.reducer,
    },
});
export default store;
export const {clearVideo,changeSearchTerm,clearSearchTerm,setCurrentPlaying}=YoutubeSlice.actions;
export const RootState = store.getState;
export const AppDispatch = store.dispatch;