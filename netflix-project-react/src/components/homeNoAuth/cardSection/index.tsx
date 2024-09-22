import styles from "./styles.module.scss"
import { Container } from "reactstrap";

const CardsSection = function () {
    return (
        <>
        <p className={styles.sectionTitle}>What you going to access</p>
        <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
            <div className={styles.card1}>
                <p className={styles.cardTitle}>SOME MOVIE</p>
                <p className={styles.cardDescription}>
                    Some movie description
                </p>
            </div>
            <div className={styles.card2}>
                <p className={styles.cardTitle}>SOME MOVIE</p>
                <p className={styles.cardDescription}>
                    Some movie description
                </p>
            </div>
            <div className={styles.card3}>
                <p className={styles.cardTitle}>SOME MOVIE</p>
                <p className={styles.cardDescription}>
                    Some movie description
                </p>
            </div>
            <div className={styles.card4}>
                <p className={styles.cardTitle}>SOME MOVIE</p>
                <p className={styles.cardDescription}>
                    Some movie description
                </p>
            </div>
            <div className={styles.card5}>
                <p className={styles.cardTitle}>SOME MOVIE</p>
                <p className={styles.cardDescription}>
                    Some movie description
                </p>
            </div>
            <div className={styles.card6}>
                <p className={styles.cardTitle}>SOME MOVIE</p>
                <p className={styles.cardDescription}>
                    Some movie description
                </p>
            </div>
        </Container>
        </>
    );
};

export default CardsSection;