import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/Context";
import { REST_BASE } from "../utilities/GlobalVariables";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "./ErrorPage";
import { fetchProjects, fetchData } from "../utilities/GlobalUtils"
import styles from '../styles/modules/single.module.css'
import FeaturedImage from "../utilities/FeaturedImage"
import GithubLink from "../components/GithubLink";
import ButtonLink from "../components/ButtonLink";
import { useIsMobile } from "../utilities/IsMobile";
import ProjectMedia from "../components/ProjectMedia";

const SingleItemPage = () => {
    const { id } = useParams();
    const restPath = REST_BASE + 'posts/' + id + "?_embed&acf_format=standard";
    const [projData, setProjData] = useState([]);
    const [projects, setProjects] = useState([]);

    // Page State
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(404);

    // Accessibility
    const { theme } = useTheme();
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const isMobile = useIsMobile();

    // Fetch data
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchData(restPath);
                setProjData(data);

                // Get related project data
                const related_project_ids = data.acf?.related_projects.map((item) => item.ID);
                console.log(related_project_ids);
                const validProjects = await fetchProjects(related_project_ids);
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
        <main id="site-main">
            <h1>{projData.title.rendered}</h1>
            <ul>
                {projData._embedded['wp:term'][1].map((t) => (<li key={t.id} className="tech-chip purple">{t.name}</li>))}
            </ul>

            <ProjectMedia projectData={projData} noMotionPreference={noMotionPreference} figureStyle={styles.project_figure} />

            <p><strong>{projData._embedded['wp:term'][0].length > 1 ? "Roles" : "Role"}:</strong>      {(() => {
                let roles_string = "";
                projData._embedded['wp:term'][0].map((role) => roles_string += (role.name + ", "));
                return roles_string.slice(0, -2);
            })()}</p>

            <section>
                <h2>Overview</h2>
                <p>{projData.acf.overview}</p>
            </section>

            <div className={styles.button_container}>
                {projData.acf?.github_link && <GithubLink link={projData.acf.github_link} color="color" />}

                {projData.acf?.external_link?.link_url && projData.acf?.external_link?.button_text &&
                    <ButtonLink color="color" isInternal={false} link={projData.acf.external_link.link_url} label={projData.acf.external_link.button_text} />}
            </div>

        </main>
    )
}

export default SingleItemPage