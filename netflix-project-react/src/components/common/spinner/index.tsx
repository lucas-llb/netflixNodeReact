import { Spinner } from "reactstrap";

const PageSpinner = function () {
    return (<>
    <div className="vh-100 bg-dark d-flex justify-content-center align-itens-center">
        <Spinner animation="border" color="light"/>
    </div>
    </>);
}

export default PageSpinner;