import { REST_BASE } from "../utilities/GlobalVariables"
import { useState, useEffect } from "react"
import LoadingPage from "../components/LoadingPage"
import styles from '../styles/modules/home.module.css'
import ButtonLink from "../components/ButtonLink"
import { ASSETS_FOLDER_PATH } from "../utilities/GlobalVariables"
import GithubLink from "../components/GithubLink"
import { useTheme } from "../context/Context"

const HomePage = () => {
    const restPath = REST_BASE + 'pages/37'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const { theme } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data.acf)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    if (!isLoaded) {
        return (<LoadingPage />)
    }

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1>{restData.name}</h1>
                <p className={styles.title}>{restData.title}</p>
                <p>{restData.hero_blurb}</p>
                <div className={styles.hero_links}>
                    <ButtonLink isInternal={true} link="/Projects" label="My Works" color={theme === "dark" ? "color" : "plain"} />
                    <GithubLink link="https://github.com/MelissaGoon" color={theme === "dark" ? "color" : "plain"} />


                </div>

            </section>

            <section className={styles.about_me}>
                <h2>{restData.about_me_title}</h2>
                {/* TODO: MediaQ */}
                <img src={`${ASSETS_FOLDER_PATH}me-light-animated.svg`} alt="" />

                <div>

                </div>
            </section>
        </main>
    )

}

export default HomePage