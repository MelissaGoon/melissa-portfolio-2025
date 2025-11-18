import React from 'react'

const ErrorPage = () => {
    return (
        <main className="error-page" id="site-main">
            <h1>Something went wrong...</h1>
            <p>Sorry! This shouldn't be happening, click to try again!</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </main>
    )
}

export default ErrorPage