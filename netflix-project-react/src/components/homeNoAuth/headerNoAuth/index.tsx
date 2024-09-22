import { Container, Button } from "reactstrap";
import styles from "./styles.module.scss"
import Link from "next/link";

const HeaderNoAuth = function () {
    return (
        <>
        <div className={styles.ctaSection}>
            <img src="/homeNoAuth/logoCta.png" alt="logoCta" className={styles.imgCta}/>
            <p> Sign in to enjoy your videos </p>
            <img src="/homeNoAuth/logoCta.png" alt="logoCta" className={styles.imgCta}/>
        </div>
        <Container className={styles.nav}>
            <img src="/logoOnebitflix.svg" alt="logoNetflix" className={styles.imgLogoNav}/>
            <div>
                <Link href="/login">
                <Button className={styles.navBtn} outline >Login</Button>
                </Link>
                <Link href="/register">
                <Button className={styles.navBtn} outline >Register</Button>
                </Link>                
            </div>
        </Container>
        </>
    );
};

export default HeaderNoAuth;