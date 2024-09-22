import { SerieType } from '@/services/serieService';
import styles from './styles.module.scss'
import { Button, Container } from 'reactstrap';
import SlideComponent from '@/components/common/slideComponent';
import Link from 'next/link';

interface props {
    newestSeries: SerieType[];
}

const SlideSection = function ({newestSeries}: props) {
    return <>
    <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.sectionName}>SERIES AVAILABLE</p>
        <SlideComponent serie={newestSeries}></SlideComponent>
        <Link href="/register">
        <Button outline color="light" className={styles.slideSectionBtn}>Register now</Button>
        </Link>
    </Container>
    </>;
};

export default SlideSection;