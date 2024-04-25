export const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

export const homePageVideos = {
  videoId: "",
  videoTitle: "",
  videoDescription: "",
  videoLink: "",
  videoThumbnail: "",
  videoDuration: "",
  videoViews: "",
  videoAge: "",
  channelInfo: {
    id: "",
    image: "",
    name: "",
  },
};

export const currentPlaying = {
  videoId: "",
  videoTitle: "",
  videoDescription: "",
  videoViews: "",
  videoLikes: "",
  videoAge: "",
  channelInfo: {
    id: "",
    image: "",
    name: "",
    subscribers: "",
  },
};

export const recommendedVideos = {
  videoId: "",
  videoTitle: "",
  videoThumbnail: "",
  videoDuration: "",
  videoViews: "",
  videoAge: "",
  channelInfo: {
    id: "",
    name: "",
  },
};

export const item = {
  snippet: {
    title: "",
    thumbnails: { medium: { url: "" } },
    publishedAt: new Date(),
    channelTitle: "",
    channelId: "",
  },
  contentDetails: { upload: { videoId: "" } },
};
