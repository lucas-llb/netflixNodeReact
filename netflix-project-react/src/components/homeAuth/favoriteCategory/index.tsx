import useSWR from "swr";
import styles from "../../../styles/slideCategory.module.scss"
import SerieService from "@/services/serieService";
import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";

const FavoriteCategory = function () {
    const { data, error } = useSWR("/favorites", SerieService.getFavorites);

  if (error) return error;
  if (!data) {
    return (<PageSpinner/>);
  }
  
    return (<>
        <p className={styles.titleCategory}>My List</p>
        {data.data.series.length >= 1 ? (
            <SlideComponent serie={data.data.series}/>
        ) : (
            <p className="text-center pt-3 h5"><strong>You do not have any favorites</strong></p>
        )}
    </>);
}

export default FavoriteCategory;