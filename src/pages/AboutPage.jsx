import styles from '../styles/modules/about.module.css'
import { fetchData } from '../utilities/GlobalUtils';
import { REST_BASE, APP_SUFFIX } from '../utilities/GlobalVariables';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import ACFImage from '../utilities/ACFImage';

const AboutPage = () => {
    // Data
    const restPath = REST_BASE + 'pages/39?_embed&&acf_format=standard';
    const [restData, setData] = useState([]);


    // Page State
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(404);


    // Fetch data
    useEffect(() => {
        document.title = `About ${APP_SUFFIX}`;
        const loadData = async () => {
            try {
                const data = await fetchData(restPath);
                setData(data.acf);
                setIsLoaded(true);


            } catch (e) {
                setIsLoaded(true);
                setError(true);
                if (e.status) {
                    setErrorCode(e.status);
                }
                console.log(e);

            }
        }

        loadData();

    }, [restPath]);

    if (!isLoaded) {
        return (<LoadingPage />)
    }

    if (error) {
        return (
            <ErrorPage errorCode={errorCode} />
        )
    }

    return (
        <main id='site-main' className={styles.about_main}>
            <div className={styles.about}>
                <h1>✦ About Me ✦</h1>

                <div className={styles.cards}>

                    <div className={styles.profile_image}>
                        <ACFImage acfImageObject={restData.profile_image} />

                    </div>

                    <article className={`${styles.about_card} ${styles.card}`}>
                        <h2>{restData.about_card?.about_me_title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: restData.about_card?.about_me_content }}></div>
                    </article>

                    <article className={`${styles.skills_card} ${styles.card}`}>
                        <h2>{restData.skills_card?.skills_card_title}</h2>
                        {
                            restData.skills_card?.skill_items.map((item, index) => (
                                <section key={index} className={styles.skill_item}>
                                    <h3>{item.skill_title}</h3>
                                    <p>{item.skill_description}</p>

                                    <ul className={styles.chips_container}>
                                        {
                                            item.skill_chips.map((skill, i) => (
                                                <li className={styles.chip} key={i}>

                                                    {skill.skill_icon &&
                                                        <img src={skill.skill_icon} alt={`Logo for ${skill.skill_name}`} />
                                                    }

                                                    <p>{skill.skill_name}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </section>
                            ))
                        }
                    </article>

                    <article className={`${styles.hobbies_card} ${styles.card}`}>
                        <h2>{restData.personal_interests_card?.personal_interests_title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: restData.personal_interests_card?.personal_interests_content }}></div>
                    </article>
                </div>
            </div>
        </main>
    )
}

export default AboutPage