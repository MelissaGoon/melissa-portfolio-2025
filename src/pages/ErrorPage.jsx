import PropTypes from "prop-types";
import { APP_SUFFIX } from "../utilities/GlobalVariables";
import ButtonLink from "../components/ButtonLink";
import { useEffect } from "react";

const ErrorPage = ({ errorCode }) => {
    useEffect(() => { document.title = `Error ${APP_SUFFIX}`; });

    if (errorCode === 404) {
        return (
            <main className="error-page" id="site-main">
                <h1>Page Not Found</h1>
                <p>Hmm, nothing here... Click below to get back to the homepage!</p>
                <ButtonLink color="color" isInternal={true} label="Home" link="/" />
            </main>
        )
    } else {
        return (
            <main className="error-page" id="site-main">
                <h1>Something went wrong...</h1>
                <p>Sorry! This shouldn't be happening, click to try again!</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </main>
        )
    }
}

ErrorPage.propTypes = {
    errorCode: PropTypes.number

};

export default ErrorPage