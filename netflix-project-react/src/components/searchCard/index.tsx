import { SerieType } from "@/services/serieService";
import styles from "./styles.module.scss";
import Link from "next/link";

interface props {
    serie: SerieType
}

const SearchCard = function ({serie} : props) {
    return (<>
    <Link href={`/serie/${serie.id}`}>
        <div className={styles.searchCard}>
            <img src={`${process.env.BACKEND_API_URL}/${serie.thumbnailUrl}`} alt={serie.name} className={styles.searchCardImg}/>
            <p className={styles.searchCardTitle}>{serie.name}</p>
            <p className={styles.searchCardDescription}>{serie.synopsis}</p>
        </div>
    </Link>
    </>);
};

export default SearchCard;