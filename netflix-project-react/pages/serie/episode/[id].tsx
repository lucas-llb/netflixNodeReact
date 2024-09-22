import Head from "next/head";
import styles from "../../../src/styles/episodePlayer.module.scss";
import { useRouter } from "next/router";
import HeaderGeneric from "@/components/common/headerGeneric";
import { useEffect, useRef, useState } from "react";
import EpisodeService from "@/services/episodeService"
import SerieService, { SerieType } from "@/services/serieService";
import PageSpinner from "@/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

const EpisodePlayer = function () {
  const router = useRouter();
  const [serie, setSerie] = useState<SerieType>();
  const [episodeTime, setEpisodeTime] = useState(0);
  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const episodeId = parseFloat(router.query.episodeid?.toString() || "");
  const serieId = router.query.serieid?.toString() || "";

  useEffect(() => {
    if (!sessionStorage.getItem("netflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const handleGetEpisodeTime = async () => {
    const res =  await EpisodeService.getWatchTime(episodeId);

    if(res.data !== null){
        setGetEpisodeTime(res.data.seconds)
    }
  };

  const handleSetEpisodeTime = async () => {
    await EpisodeService.setWatchTime({
        episodeId: episodeId,
        seconds: Math.round(episodeTime)});
  };

  const getSerie = async function () {
    if (typeof serieId !== "string") return;

    const res = await SerieService.getEpisodes(serieId);

    if (res.status === 200) {
      setSerie(res.data);
    }
  };

  useEffect(() => {
    getSerie();
  }, [serieId]);

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };
  
  if(isReady === true){
    setTimeout(() => {handleSetEpisodeTime()}, 1000*3)
  }
  
  const handleLastEpisode = () => {
    router.push(`/serie/episode/${episodeOrder - 1}?serieid=${serie?.id}&episodeid=${serie?.episodes![episodeOrder-1].id}`)
  };
  
  const handleNextEpisode = () => {
    router.push(`/serie/episode/${episodeOrder + 1}?serieid=${serie?.id}&episodeid=${serie?.episodes![episodeOrder+1]?.id}`)
  };
    
  if (serie?.episodes === undefined) {
    return <PageSpinner />;
  }
  
  if(episodeOrder + 1 < serie?.episodes?.length){
    if(Math.round(episodeTime) === serie.episodes[episodeOrder].secondsLong){
      handleNextEpisode();
    }
  }
  
  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Netflix - {serie?.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={"Return to serie page"}
          btnUrl={`/serie/${serieId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>
            {serie.episodes[episodeOrder].name}
          </p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.BACKEND_API_URL
              }/episodes/stream?videoUrl=${
                serie.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("netflix-token")}`}
              controls
              ref={playerRef}
              onProgress={(progress) => setEpisodeTime(progress.playedSeconds)}
              onStart={handlePlayerTime}
            />
          )}
          <div className={styles.episodeBtnDiv}>
            <Button
              className={styles.episodeBtn}
              disabled={episodeOrder === 0 ? true : false}
              onClick={handleLastEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="arrowLeft"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeBtn}
              disabled={
                episodeOrder + 1 == serie.episodes.length ? true : false
              }
              onClick={handleNextEpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="arrowRight"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center py-4">
            {serie.episodes[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
