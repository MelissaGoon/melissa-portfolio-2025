import { APP_SUFFIX, REST_BASE } from "../utilities/GlobalVariables"
import { useState, useEffect } from "react"
import LoadingPage from "./LoadingPage"
import styles from '../styles/modules/home.module.css'
import ButtonLink from "../components/ButtonLink"
import { ASSETS_FOLDER_PATH } from "../utilities/GlobalVariables"
import GithubLink from "../components/GithubLink"
import { useTheme } from "../context/Context"
import ErrorPage from "./ErrorPage"
import { fetchProjects, fetchData } from "../utilities/GlobalUtils"
import ProjectCard from "../components/ProjectCard"

const HomePage = () => {
    // Data
    const restPath = REST_BASE + 'pages/37';
    const [restData, setData] = useState([]);
    const [projects, setProjects] = useState([]);

    // Page State
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(404);

    // Accessibility
    const { theme } = useTheme();
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    // Fetch data
    useEffect(() => {
        document.title = `Home ${APP_SUFFIX}`;
        const loadData = async () => {
            try {
                const data = await fetchData(restPath);
                setData(data);


                // Get featured project data
                const featured_projects = data.acf.featured_projects;
                const validProjects = await fetchProjects(featured_projects, true);
                setProjects(validProjects);

                setIsLoaded(true);
            } catch (err) {
                setIsLoaded(true);
                setError(true);
                if (err.status) {
                    setErrorCode(err.status);
                }
                console.log(err);
            }
        };
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
        <main className={styles.main} id="site-main">
            <section className={styles.hero}>
                <div className={styles.hero_content}>
                    <h1>{restData.acf.name}</h1>
                    <p className={styles.title}>{restData.acf.title}</p>
                    <p>{restData.acf.hero_blurb}</p>
                    <div className={styles.hero_links}>
                        <ButtonLink isInternal={true} link="/Projects" label="My Works ✦" color={theme === "dark" ? "color" : "plain"} />
                        <GithubLink srText="View my profile on Github" link="https://github.com/MelissaGoon" color={theme === "dark" ? "color" : "plain"} />
                    </div>

                    <a className={styles.down_arrow} href="#about-me" >
                        <span className="screen-reader-text">Click to scroll to the About section.</span>
                        <svg focusable="false" aria-hidden="true" width="121" height="53" viewBox="0 0 121 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M98.6323 0C104.372 5.71003 113.376 6.70124 120.221 2.37744C114.511 8.11725 113.52 17.1214 117.844 23.9663C112.267 18.4187 102.703 20.9864 96.0146 23.8813L60.145 52.3081L24.3574 23.9473C17.6627 21.0261 7.99786 18.3773 2.37891 23.9663C6.70265 17.1213 5.71007 8.11719 0 2.37744C6.84536 6.70162 15.8502 5.71032 21.5903 0C17.1429 6.9908 22.0715 15.9677 26.48 21.8013L60.145 48.479L93.6401 21.9346C98.0738 16.1052 103.114 7.04447 98.6323 0Z" fill="white" />
                        </svg>

                    </a>

                </div>
            </section>


            <section className={styles.about}>

                {/* Display one of 4 SVG artworks based on user preference */}
                <div className={styles.me_container}>
                    {noMotionPreference ?
                        <img className={styles.me_svg} src={theme === "light" ? `${ASSETS_FOLDER_PATH}me-light-animated.svg` : `${ASSETS_FOLDER_PATH}me-dark-animated.svg`} alt="Animated SVG art of me working on a laptop while surrounded by flowers." />
                        :
                        <img className={styles.me_svg} src={theme === "light" ? `${ASSETS_FOLDER_PATH}me-light.svg` : `${ASSETS_FOLDER_PATH}me-dark.svg`} alt="SVG art of me working on a laptop while surrounded by flowers." />
                    }
                </div>

                <div className={styles.about_me}>
                    <div className={styles.about_top}>
                        <h2 id="about-me">{restData.acf.about_me_title}</h2>

                        <div className={styles.info_card_container}>
                            <div className={styles.info_card}>

                                <svg width="82" height="78" viewBox="0 0 82 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <title>Education</title>
                                    <path d="M76.1515 54.8573C76.0169 55.189 74.9664 55.189 74.8318 54.8573C73.8464 52.4282 71.9241 50.4864 69.5237 49.4974C69.1938 49.3615 69.0106 47.8856 69.2709 47.6415C71.953 45.1261 74.0737 39.2549 75.0182 35.1179C75.0979 34.7689 75.8853 34.7689 75.965 35.1179C76.9096 39.2548 79.0302 45.1259 81.7122 47.6413C81.9725 47.8854 81.7894 49.3612 81.4594 49.4971C79.0591 50.4862 77.1368 52.4281 76.1515 54.8573Z" fill="#E9FF5C" />
                                    <path d="M64.9915 62.0333C64.9914 67.0743 61.5149 71.0012 57.2669 73.4806C52.9332 76.0113 47.1697 77.465 40.9915 77.465C34.8133 77.465 29.0532 76.0113 24.7161 73.4806C20.4681 71.0012 16.9915 67.0743 16.9915 62.0333V40.7333C16.9915 40.3717 17.3638 40.1304 17.6914 40.2833C29.2304 45.6701 37.5839 56.4514 40.3428 66.5195C40.4923 67.0647 41.4927 67.0647 41.6421 66.5195C44.4009 56.4516 52.7537 45.6702 64.2916 40.2834C64.6192 40.1304 64.9915 40.3718 64.9915 40.7333V62.0333Z" fill="#E9FF5C" />
                                    <path d="M40.3224 0.407261C40.4796 -0.135753 41.5018 -0.135754 41.6591 0.407259C45.6858 14.3117 61.4038 25.3933 81.5256 28.69C82.1349 28.7898 82.1349 30.1391 81.5256 30.2389C61.4038 33.5356 45.6858 44.6174 41.6591 58.5226C41.5018 59.0656 40.4796 59.0656 40.3223 58.5226C36.2956 44.6182 20.5777 33.5366 0.456989 30.2399C-0.152327 30.1401 -0.152331 28.7908 0.456985 28.691C20.5777 25.3942 36.2956 14.3118 40.3224 0.407261Z" fill="#E9FF5C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M81.5256 30.2389C82.1349 30.1391 82.1349 28.7898 81.5256 28.69C61.4038 25.3933 45.6858 14.3117 41.6591 0.407259C41.5018 -0.135754 40.4796 -0.135753 40.3224 0.407261C36.2956 14.3118 20.5777 25.3942 0.456985 28.691C-0.152331 28.7908 -0.152327 30.1401 0.456989 30.2399C20.5777 33.5366 36.2956 44.6182 40.3223 58.5226C40.4796 59.0656 41.5018 59.0656 41.6591 58.5226C45.6858 44.6174 61.4038 33.5356 81.5256 30.2389Z" fill="#E9FF5C" />
                                </svg>

                                <p>{restData.acf.education}</p>


                            </div>
                            <div className={styles.info_card}>

                                <svg width="52" height="75" viewBox="0 0 52 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <title>Location</title>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M25.0215 0.433471C25.1658 -0.144492 26.4504 -0.144489 26.5947 0.433471C29.5997 12.4651 39.0914 21.957 51.1231 24.9618C51.7008 25.1064 51.7976 26.7739 51.2647 27.0399C39.0146 33.1471 29.3727 58.3927 26.4844 73.579C26.373 74.164 25.2434 74.1639 25.1318 73.579C22.2435 58.3928 12.6013 33.148 0.350593 27.0409C-0.182483 26.775 -0.0857213 25.1072 0.492195 24.9628C12.5246 21.9579 22.0166 12.4659 25.0215 0.433471ZM25.5977 20.0604C20.9033 20.0604 17.0977 23.866 17.0977 28.5604C17.0978 33.2547 20.9034 37.0604 25.5977 37.0604C30.292 37.0604 34.0975 33.2547 34.0977 28.5604C34.0977 23.866 30.2921 20.0604 25.5977 20.0604Z" fill="#E9FF5C" />
                                </svg>

                                <p>{restData.acf.location}</p>

                            </div>
                        </div>
                    </div>
                    <div className={styles.about_div}>
                        <p>{restData.acf.short_about_me_paragraph}</p>

                    </div>


                    <ButtonLink color="color" label="More About Me →" isInternal="true" link="/about-me" style={{ alignSelf: 'start' }} />

                </div>
            </section>

            <div className="divider"></div>

            <section className={styles.featured_projects}>
                <div className={styles.featured_heading}><h2>Featured Projects ✦</h2>
                    <ButtonLink color="color" label="See More →" isInternal={true} link='/projects' style={{ margin: 0 }} />
                </div>
                <div className={styles.project_container}>

                    {

                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} styles={styles} buttonLabel="✦ View Project ✦" />))
                    }
                </div>

            </section>
        </main>
    )

}

export default HomePage