import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { REST_BASE } from "../utilities/GlobalVariables";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "./ErrorPage";
import { fetchProjects, fetchData } from "../utilities/GlobalUtils"
import styles from '../styles/modules/single.module.css'
import FeaturedImage from "../utilities/FeaturedImage"
import GithubLink from "../components/GithubLink";
import ButtonLink from "../components/ButtonLink";
import ProjectMedia from "../components/ProjectMedia";
import Tabs from "../components/Tabs";
import KeyContributionsContent from "../components/KeyContributionsContent";
import InsightsContent from "../components/InsightsContent";

const SingleItemPage = () => {
    const { id } = useParams();
    const restPath = REST_BASE + 'posts/' + id + "?_embed&acf_format=standard";
    const [projData, setProjData] = useState([]);
    const [moreProjects, setMoreProjects] = useState([]);

    // Page State
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(404);

    // Accessibility
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;


    // Fetch data
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchData(restPath);
                setProjData(data);

                // Get related project data
                const related_project_ids = data.acf?.related_projects.map((item) => item.ID);
                const validProjects = await fetchProjects(related_project_ids);
                setMoreProjects(validProjects);

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


            {projData.acf?.tabs?.length > 0 && (() => {


                let tabs = projData.acf.tabs.map((tab, index) => {
                    if (tab.acf_fc_layout === "key_contributions") {
                        return { id: `tab${index}`, label: tab.tab_title, content: <KeyContributionsContent acfContributionItem={tab} className={styles.contributions} /> };
                    } else if (tab.acf_fc_layout === "insights") {
                        return { id: `tab${index}`, label: tab.tab_title, content: <InsightsContent acfInsightItem={tab} className={styles.insights} /> };
                    } else {
                        return { id: `tab${index}`, label: tab.tab_title, content: <div className={styles.design} dangerouslySetInnerHTML={{ __html: tab.tab_content }}></div> };
                    }

                })


                return (
                    <section>
                        <h2>{projData.acf.tabs_section_title}</h2>
                        <Tabs tabs={tabs} styles={styles} />
                    </section>)
            })()}


            <section>
                <h2>More Projects</h2>
                <div className={styles.project_container}>

                    {

                        moreProjects.map((project) => {

                            const tech = project._embedded['wp:term'][1];

                            return (
                                <article key={project.id} className={styles.project_card}>
                                    <ProjectMedia projectData={project} noMotionPreference={noMotionPreference} figureStyle={styles.project_fig} />

                                    <div className={styles.card_content}>
                                        <h3>{project.title.rendered}</h3>
                                        <ul>
                                            {tech.map((t) => (<li key={t.id} className="tech-chip">{t.name}</li>))}
                                        </ul>


                                        <ButtonLink color="plain" label="View Project" isInternal={true} link={`/projects/${project.id}`} />
                                    </div>
                                </article>)
                        })
                    }
                </div>
            </section>


        </main>
    )
}

export default SingleItemPage