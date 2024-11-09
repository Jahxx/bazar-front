import {isRouteErrorResponse, useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    const errorMessage = isRouteErrorResponse(error)
        ? error.statusText
        : error instanceof Error
            ? error.message
            : 'Unknown error';

    return (<div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has ocurred.</p>
        <p>
            <i>{errorMessage}</i>
        </p>
    </div>);
}

export default ErrorPage