import styles from "./styles.module.scss";
import useSWR from "swr";
import SerieService, { SerieType } from "@/services/serieService";
import HeaderAuth from "@/components/common/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import PageSpinner from "@/components/common/spinner";

const FeaturedSection = function () {
  const { data, error } = useSWR("/featured", SerieService.getFeaturedSeries);

  if (error) return error;
  if (!data) {
    return (<PageSpinner/>);
  }

  return (
    <>
      {
        data.data?.map((serie: SerieType) => (
          <div
            style={{
              backgroundImage: `linear-gradiant(to bottom, #6666661a, #151515) url(${process.env.BACKEND_API_URL}/${serie.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "480px"
            }}
            key={serie.id}
          >
            <HeaderAuth />
            <Container className="pt-4">
              <p className={styles.title}>{serie.name}</p>
              <p className={styles.description}>{serie.synopsis}</p>
              <Link href={`/series/${serie.id}`}>
                <Button outline color="light" className={styles.button}>
                  ACCESS NOW
                  <img
                    src="buttonPlay.svg"
                    alt="buttonImg"
                    className={styles.buttonImg}
                  />
                </Button>
              </Link>
            </Container>
          </div>
        ))[0]
      }
    </>
  );
};

export default FeaturedSection;
