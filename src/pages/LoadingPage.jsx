import { ASSETS_FOLDER_PATH } from "../utilities/GlobalVariables";
import { useTheme } from "../context/Context";
const LoadingPage = () => {
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const { theme } = useTheme();
    return (
        <main id="site-main" className="loading-page">

            {noMotionPreference ?
                <img src={theme === "light" ? `${ASSETS_FOLDER_PATH}light-loader-animated.svg` : `${ASSETS_FOLDER_PATH}dark-loader-animated.svg`} alt="Loading" />
                :
                <img src={theme === "light" ? `${ASSETS_FOLDER_PATH}light-loader.svg` : `${ASSETS_FOLDER_PATH}dark-loader.svg`} alt="Loading" />
            }
        </main>
    )
}

export default LoadingPage