import Link from 'next/link';
import styles from './styles.module.scss'
import { SerieType } from '@/services/serieService';

interface props {
    serie: SerieType
}

const SlideCard = function ({serie} : props) {
return (
    <>
    <Link href={`/serie/${serie.id}`}>
    <div className={styles.slide}>
        <img src ={`${process.env.BACKEND_API_URL}/${serie.thumbnailUrl}`} alt={serie.name}  className={styles.slideImg}/>
        <p className={styles.slideTitle}>{serie.name}</p>
        <p className={styles.slideDescription}>{serie.synopsis}</p>
    </div>
    </Link>
    </>
)
}

export default SlideCard;