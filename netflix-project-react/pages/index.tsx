import Head from 'next/head'
import HeaderNoAuth from '../src/components/homeNoAuth/headerNoAuth'
import PresentationSection from '../src/components/homeNoAuth/presentationSection'
import CardsSection from '../src/components/homeNoAuth/cardSection'
import SlideSection from '../src/components/homeNoAuth/slideSection'
import styles from '../src/styles/homeNoAuth.module.scss'
import { GetStaticProps } from 'next'
import SerieService, { SerieType } from '@/services/serieService'
import { ReactNode } from 'react'
import Footer from '@/components/common/footer'

interface IndexPageProps {
    children?: ReactNode,
    serie: SerieType[];
}

const HomeNoAuth = ({serie}: IndexPageProps) => {
    return (
        <>
        <Head>
            <title>Netflix</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
            <meta property="og:title" content="Netflix" key="title" />
            <meta name="description" content="A video streaming app" />
        </Head>
        <main>
            <div className={styles.sectionBackground}>
            <HeaderNoAuth/>
            <PresentationSection/>
            </div>
            <CardsSection/>
            <SlideSection newestSeries={serie}></SlideSection>
            <Footer></Footer>
        </main>
        </>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await SerieService.getNewestSeries();

    if(res === undefined){
        return {
            props: {
                serie: [{}]
            }
        }
    }
    return {
        props: {
            serie: res.data,
        },
        revalidate: 3600 * 24
    };
};

export default HomeNoAuth;