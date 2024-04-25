import axios from "axios";
import { convertRawViewstoString } from './convertRawViewsToString';
import { parseVideoDuration } from './parseVideoDuration';
import { timeSince } from './timeSince';
import { YOUTUBE_API_URL } from "./constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

const parseData = async (items) => {
  try {
    const videoIds = items.map(item => item.id.videoId);
    const channelIds = items.map(item => item.snippet.channelId);

    const [channelsResponse, videosResponse] = await Promise.all([
      axios.get(`${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`),
      axios.get(`${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`)
    ]);
    
    const channelsData = channelsResponse.data.items;
    const videosData = videosResponse.data.items;
    
    const parsedChannelsData = channelsData.map(channel => ({
      id: channel.id,
      image: channel.snippet.thumbnails.default.url,
    }));
    
    const parsedData = items.map((item, index) => {
      const { image: channelImage } = parsedChannelsData.find(data => data.id === item.snippet.channelId) || {};
      
      if (channelImage && videosData[index]) {
        return {
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(videosData[index].contentDetails.duration),
          videoViews: convertRawViewstoString(videosData[index].statistics.viewCount),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          },
        };
      }
      return null;
    }).filter(Boolean); 
    console.log(parsedData)
    return parsedData;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default parseData;
