import { REST_BASE } from "../utilities/GlobalVariables"
import { useState, useEffect } from "react"
import LoadingPage from "../components/LoadingPage"
import styles from '../styles/modules/home.module.css'


const HomePage = () => {
    const restPath = REST_BASE + 'pages/37'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

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
        <main>
            <section className={styles.hero}>
                <h1>{restData.name}</h1>
                <p>{restData.title}</p>
                <p>{restData.hero_blurb}</p>
            </section>

            <section className={styles.about_me}>
                <h2>{restData.about_me_title}</h2>

                <div>

                </div>
            </section>
        </main>
    )

}

export default HomePage