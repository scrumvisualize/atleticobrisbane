import React, { useState, useEffect } from 'react';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const testimonials = [

  {
    name: 'Noby Thomas',
    text: 'My kids enjoy playing at Atletico Soccer Club. This club is friendly and has been amazing for my kids. Everyone is supportive, and the environment is fantastic!',
    photo: 'images/noby_test.png'
  },
  {
    name: 'Haju Thomas',
    text: "My son is really happy playing with his friends at Atletico. The community is welcoming, and the training is excellent. I'm really keen to see Atletico achieve more victories in the years to come.",
    photo: 'images/hajutest_1.PNG'
  },
  {
    name: 'Jibi',
    text: 'Everyone at the club is doing their very best to build competitive games at Atletico. The club is very supportive in developing kids to excel in soccer. I am happy and eagerly looking forward to seeing the kids perform in the next tournament.',
    photo: 'images/jibi_test.png'
  },
];

const initialVideos = [
  {
    title: 'Shyju and Joshua',
    src: 'images/abvideo.mp4',
    views: 0,
  },
  {
    title: 'Prakash and Gautham',
    src: 'images/abvideomain.mp4',
    views: 0
  },
  {
    title: 'Jipson and Josh',
    url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    views: 0,
  },
];

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const Testimonials = () => {

  const [videos, setVideos] = useState(initialVideos);
  const [allVideoViews, setAllVideoViews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${appURL}/service/allVideoViews`);
        setAllVideoViews(res.data.videoViews);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleVideoClick = async (index) => {
    const updatedVideos = videos.map((video, i) =>
      i === index ? { ...video, views: video.views + 1 } : video
    );

    setVideos(updatedVideos);
    const videoData = updatedVideos[index];

    try {
      const fileName = videoData.src.replace(/^images\//, '');
      console.log("What is the video name, views::" + fileName, videoData.views);
      await axios.put(`${appURL}/service/saveVideoViews`, {
        videoname: fileName,
        views: videoData.views,
      });

    } catch (error) {
      console.error('Error updating video views:', error);
    }
  };

  return (
    <div className="py-8 bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 text-lg italic mb-4">"{testimonial.text}"</p>
              <p className="text-gray-900 font-semibold text-right">- {testimonial.name}</p>
              <img src={testimonial.photo} alt="Player" className="w-12 h-12 rounded-full ml-2 mr-2 justify-end" />
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-center my-8 text-gradient">Latest Catch Up With Atlético People</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => {
            const fileName = video.src ? video.src.replace(/^images\//, '') : '';
            const videoViewData = allVideoViews.find(view => view.videoname === fileName);

            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <video
                  className="w-full h-64 rounded-lg"
                  controls
                  src={video.src}
                  onPlay={() => handleVideoClick(index)}
                >
                  Your browser does not support the video tag.
                </video>
                <h3 className="text-base font-bold text-gray-900 text-center mt-4 text-gradient">Interview with {video.title}</h3>
                <div className="flex items-center justify-center text-center p-2 mt-2 w-48 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg animate-pulse mx-auto">
                  <h1 className="text-xl font-bold text-white">Coming Soon!</h1>
                </div>
                {videoViewData && (
                  <div className="flex items-center text-gray-700 mt-2">
                    <EyeIcon />
                    <span>{videoViewData.views}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;