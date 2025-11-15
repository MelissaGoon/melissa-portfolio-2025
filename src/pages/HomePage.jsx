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
        <main className={styles.main} id="site-main">
            <section className={styles.hero}>
                <div className={styles.hero_content}>
                    <h1>{restData.name}</h1>
                    <p className={styles.title}>{restData.title}</p>
                    <p>{restData.hero_blurb}</p>
                    <div className={styles.hero_links}>
                        <ButtonLink isInternal={true} link="/Projects" label="My Works ✦" color={theme === "dark" ? "color" : "plain"} />
                        <GithubLink link="https://github.com/MelissaGoon" color={theme === "dark" ? "color" : "plain"} />
                    </div>

                    <a className={styles.down_arrow} href="#about-me" >
                        <span className="screen-reader-text">Click to scroll to the About section.</span>
                        <svg width="121" height="53" viewBox="0 0 121 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M98.6323 0C104.372 5.71003 113.376 6.70124 120.221 2.37744C114.511 8.11725 113.52 17.1214 117.844 23.9663C112.267 18.4187 102.703 20.9864 96.0146 23.8813L60.145 52.3081L24.3574 23.9473C17.6627 21.0261 7.99786 18.3773 2.37891 23.9663C6.70265 17.1213 5.71007 8.11719 0 2.37744C6.84536 6.70162 15.8502 5.71032 21.5903 0C17.1429 6.9908 22.0715 15.9677 26.48 21.8013L60.145 48.479L93.6401 21.9346C98.0738 16.1052 103.114 7.04447 98.6323 0Z" fill="white" />
                        </svg>

                    </a>

                </div>
            </section>

            <section className={styles.about_me}>
                <h2 id="about-me">{restData.about_me_title}</h2>
                {/* TODO: MediaQ */}
                <img src={`${ASSETS_FOLDER_PATH}me-light-animated.svg`} alt="" />

                <div>

                </div>
            </section>
        </main>
    )

}

export default HomePage