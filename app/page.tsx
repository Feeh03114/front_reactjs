'use client';

import api from "@/service/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Video {
  id: string;
  name: string;
  url: string;
}

export default function Home() {
  const [videos, setVideos] = useState<string[]>([] as string[]);
  const [video, setVideo] = useState('https://www.youtube.com/embed/ABON3RDQF3A?si=k6Fh6iN5DH5ckl1U');

  const loadingVideos = async ()=>{
    try {
      const {data } = await api.get('videos');
      const videoFavorito = data?.find((x: Video)=> x.name === 'favorito');
      if(videoFavorito) setVideo(videoFavorito.url);
      setVideos(data?.filter((x: Video)=> x.name !== 'favorito').map((video: Video) => video.url));
      toast.success('Vídeos carregados com sucesso');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar os vídeos');
    }
  }

  useEffect(() => {
    loadingVideos();
  }, []);

  const playVideo = ()=>{
    const videoPreview = document.getElementById('videoPreview') as HTMLIFrameElement;
    if (videoPreview) {
      videoPreview.addEventListener('load', () => {
        if(videoPreview.src.includes('&autoplay=1')) return;
        videoPreview.src += '&autoplay=1';
      });
      videoPreview.removeEventListener('load', () => {
        videoPreview.src += '&autoplay=1';
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-xl">Meu vídeo favorito</h1>
        <div className="flex items-center justify-center">
          <iframe
            id="videoPreview"
            className="w-full h-[30rem] aspect-video"
            src={video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            autoFocus
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-auto">
        <h1 className="font-semibold">Outros vídeos que eu gosto</h1>
        <div className="flex flex-row items-center gap-4 overflow-x-scroll whitespace-nowrap flex-nowrap">
          {
            videos?.map((videoSave, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-4 cursor-pointer"
                onClick={()=>{
                  setVideos([...videos.filter((video) => video !== videoSave), video]);
                  setVideo(videoSave);
                  playVideo();
                }}
              >
                <iframe 
                  className="w-44 aspect-video pointer-events-none"
                  src={videoSave}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
