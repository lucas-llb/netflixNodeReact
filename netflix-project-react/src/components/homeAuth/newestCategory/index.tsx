import SlideComponent from "@/components/common/slideComponent";
import SerieService from "@/services/serieService";
import useSWR from "swr";
import styles from "../../../styles/slideCategory.module.scss";
import PageSpinner from "@/components/common/spinner";

const NewestCategory = function () {
    const { data, error } = useSWR("/newest", SerieService.getNewestSeries);

  if (error) return error;
  if (!data) {
    return (<PageSpinner/>);
  }
    return (<>
    <p className={styles.titleCategory}>NEWEST</p>
    <SlideComponent serie={data.data}/>
    </>);
}

export default NewestCategory;