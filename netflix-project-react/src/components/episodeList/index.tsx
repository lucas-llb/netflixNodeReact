import { EpisodeType, SerieType } from "@/services/serieService";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface props {
    episode:EpisodeType;
    serie: SerieType;
}

const EpisodeList = function ({episode, serie}:props) {
    const router = useRouter();
 
    const handleSecondsToMinutes = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        function toString(num : number){
            return num.toString().padStart(2, "0");
        }
        const result = `${toString(minutes)}:${toString(seconds)}}`
        return result;
    };

    const handleEpisodePlayer = () => {
        router.push(`/serie/episode/${episode.order - 1}?serieid=${serie.id}&episodeid=${episode.id}`)
    }

    return (<>
    <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
            <p className={styles.episodeOrder}> Episode nº {episode.order}</p>
            <p className={styles.episodeTime}>{handleSecondsToMinutes(episode.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
            <p className={styles.episodeTitle}>{episode.name}</p>
            <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
    </div>
    </>)
};

export default EpisodeList;