import { SerieType } from "@/services/serieService";
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import SlideCard from "../slideCard";

interface props {
    serie: SerieType[];
}

const SlideComponent = function ({serie}: props) {
    let slideCount = 0;

    if(serie.length > 4){
        slideCount = 4
    } else if (serie) {
        slideCount = serie.length;
    }
    return (
        <>
        <div className="d-flex flex-column align-items-center py-5">
            <Splide options={{
                type: "loop",
                perPage: slideCount,
                perMove: 1,
                width: slideCount*300,
                pagination: false,
                arrows: serie.length > 4 ? true : false,
                drag: serie.length > 4 ? true : false,
                breakpoints: {
                    1200: {
                        perPage: slideCount >= 2 ? 2 : 1,
                        width: slideCount >= 2 ? 600 : 300,
                        arrows: serie.length > 2 ? true : false,
                        drag: serie.length > 2 ? true : false,
                    },
                    600: {
                        perPage: 1,
                        width: 300,
                        arrows: serie.length > 1 ? true : false,
                        drag: serie.length > 1 ? true : false,
                    },
                    300: {
                        width: 250,
                    }
                }
            }}>
                {serie?.map((serie) => (
                    <SplideSlide key={serie.id}>
                        <SlideCard serie={serie}></SlideCard>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
        </>
    );
};

export default SlideComponent;