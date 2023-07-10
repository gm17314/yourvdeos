import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../fetchApi";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Channelcard from "../component/Channelcard";
import SubscribeButton from "../component/SubscribeButton";

const Channel = () => {
  const { channelID } = useParams();
  console.log(channelID);
  const [videoData, setVideoData] = useState();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('videos')
  const array = Array(12).fill(0);

  const getDataFromApi = async () => {
    setLoading(true);
    const apiData = await fetchFromAPI(`channel/${category}?id=${channelID}`);
    setChannelData(apiData.meta);
    setVideoData(apiData.data);
    setLoading(false);
  };

  useEffect(() => {
    getDataFromApi();
    // eslint-disable-next-line
  }, [channelID, category]);

  // console.log(channelData)

  return (
    <div className="flex flex-col gap-12 xl:gap-10">
      <div className="w-[99%] 2xl:h-72 xl:h-64 h-60">
        <img
          src={channelData?.banner[channelData?.banner.length - 1].url}
          alt=""
          className="w-full h-full"
        />
      </div>

      <div className="flex items-center w-full md:h-56  gap-4  md:flex-row flex-col">
        <div className="md:h-full flex pt-2 justify-center items-center md:w-[13%] w-[30%] ">
          <img
            src={channelData?.avatar[channelData?.avatar.length - 1].url}
            alt=""
            className=" rounded-full"
          />
        </div>
        <div className="flex flex-col md:items-start items-center  gap-2 md:w-[81%] w-[95%] ">
          <h2 className="text-2xl flex md:flex-row flex-col items-center md:gap-4 lg:gap-8">
            {channelData?.title}{" "}
            <span>
              <SubscribeButton
                channelId={channelData?.channelId}
                channelName={channelData?.title}
                channelSubscriber={channelData?.subscriberCountText + " subscribers"}
                channelLogo={
                  channelData?.avatar[
                    channelData?.avatar.length - 1
                  ].url
                }
              />
            </span>
          </h2>

          <div className=" text-[14px] ">
            <span href="/" className="text-zinc-600 font-medium text-[16px]">
              {channelData?.channelHandle}
            </span>{" "}
            &nbsp;{" "}
            <span className="text-zinc-600 font-medium text-[15px]">
              {channelData?.subscriberCountText} subscriber
            </span>{" "}
            &nbsp;{" "}
            <span className="text-zinc-600 font-medium text-[15px]">
              {channelData?.videosCount} videos
            </span>
          </div>
          <p className="text-[1rem] dot h-50% text-zinc-400">
            {channelData?.description}
          </p>
        </div>
      </div>

      <div className="p-1 pl-4  flex items-center lg:gap-6 md:gap-3">
        <button onClick={() => setCategory("videos")} className={`border-0 text-[20px] ${category === "videos" ? "border-b-2 border-black":""}`}>Videos</button>
        <button onClick={() => setCategory("playlists")} className={`border-0 text-[20px] ${category === "playlists" ? "border-b-2 border-black":""}`}>Playlist</button>
        <button onClick={() => setCategory("liveStreams")} className={`border-0 text-[20px] ${category === "liveStreams" ? "border-b-2 border-black":""}`}>Live Streams</button>
        <button onClick={() => setCategory("shorts")} className={`border-0 text-[20px] ${category === "shorts" ? "border-b-2 border-black":""}`}>Shorts</button>
      </div>

      {/* {console.log(videoData)} */}
      <div className="w-full grid justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {loading
          ? array.map((elm, index) => (
            <div key={index}>
              <div className="loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]" />
              <SkeletonTheme highlightColor="#aaa" baseColor="#9b9b9b">
                <div className=" xl:w-[23rem] lg-[21rem] md:w-[17rem] sm:w-[19rem] w-[90%] h-96 rounded-md flex flex-col gap-4">
                  <Skeleton className="h-28" borderRadius="8px" />
                  <div className="flex w-full h-28 justify-between">
                    <div className="h-full flex pt-2 justify-start w-[19%]">
                      <Skeleton circle className="h-12 w-12" />
                    </div>
                    <div className="flex flex-col gap-2 w-[81%]">
                      <Skeleton className="h-8" />
                      <Skeleton className="h-8" />
                      <Skeleton className="h-8" />
                    </div>
                  </div>
                </div>
              </SkeletonTheme>
            </div>
          ))
        :videoData?.map(
            ({
              videoId,
              title,
              channelTitle,
              publishedTimeText,
              viewCount,
              thumbnail,
              channelId,
            }) => {
              if (thumbnail) {
                return (
                  <Channelcard
                    key={videoId}
                    thumb={thumbnail}
                    link={videoId}
                    description={title}
                    channel_name={channelTitle}
                    channel_logo={["", ""]}
                    views={viewCount}
                    time={publishedTimeText}
                    channelId={channelId}
                  />
                );
              }

              return null;
            }
          )}
      </div>
    </div>
  );
};

export default Channel;
