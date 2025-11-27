import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { REST_BASE, APP_SUFFIX } from "../utilities/GlobalVariables";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { fetchProjects, fetchData } from "../utilities/GlobalUtils"
import styles from '../styles/modules/single.module.css'
import GithubLink from "../components/GithubLink";
import ButtonLink from "../components/ButtonLink";
import ProjectMedia from "../components/ProjectMedia";
import Tabs from "../components/Tabs";
import KeyContributionsContent from "../components/KeyContributionsContent";
import InsightsContent from "../components/InsightsContent";
import ScrollDrag from "../utilities/ScrollDrag";
import { useIsMobile } from "../utilities/IsMobile";

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
    const isMobile = useIsMobile();

    // Fetch data
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchData(restPath);
                setProjData(data);

                // Get related project data
                const related_project_ids = data.acf?.related_projects.map((item) => item.ID);
                const validProjects = await fetchProjects(related_project_ids, false);
                setMoreProjects(validProjects);

                document.title = `${data.title.rendered} ${APP_SUFFIX}`;
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
        <main id="site-main" className={styles.main}>
            <div className={styles.page_top}>
                <div className={styles.info}>
                    <h1>{projData.title.rendered} ✦</h1>
                    <ul className={styles.chips}>
                        {projData._embedded['wp:term'][1].map((t) => (<li key={t.id} className="tech-chip purple">{t.name}</li>))}
                    </ul>

                    <p className={styles.role}><strong>{projData._embedded['wp:term'][0].length > 1 ? "Roles" : "Role"}:</strong>      {(() => {
                        let roles_string = "";
                        projData._embedded['wp:term'][0].map((role) => roles_string += (role.name + ", "));
                        return roles_string.slice(0, -2);
                    })()}</p>

                    {
                        !isMobile &&
                        <section className={styles.overview}>
                            <h2>Overview</h2>
                            <p>{projData.acf.overview}</p>
                        </section>
                    }
                </div>


                <ProjectMedia projectData={projData} figureStyle={styles.project_figure} />

            </div >

            {isMobile &&
                <section className={styles.overview}>
                    <h2>Overview</h2>
                    <p>{projData.acf.overview}</p>
                </section>}


            <div className={styles.button_container}>
                {projData.acf?.github_link && <GithubLink srText={`View ${projData.title.rendered} on Github`} link={projData.acf.github_link} color="color" />}

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
                    <section className={styles.tabs_section}>
                        <h2>{projData.acf.tabs_section_title}</h2>
                        <Tabs tabs={tabs} styles={styles} />
                    </section>)
            })()}

            {!isMobile && <div className="divider"></div>}

            <section className={styles.projects_section}>
                <h2>More Projects</h2>
                <ScrollDrag className={styles.project_container}>

                    {

                        moreProjects.map((project) => {

                            const tech = project._embedded['wp:term'][1];

                            return (
                                <article key={project.id} className={styles.project_card}>
                                    <ProjectMedia projectData={project} figureStyle={styles.project_fig} />

                                    <div className={styles.card_content}>
                                        <h3>{project.title.rendered}</h3>
                                        <ul className={styles.chips}>
                                            {tech.map((t) => (<li key={t.id} className="tech-chip">{t.name}</li>))}
                                        </ul>


                                        <ButtonLink color="plain" label="View Project" isInternal={true} link={`/projects/${project.id}`} />
                                    </div>
                                </article>)
                        })
                    }
                </ScrollDrag>
            </section>


        </main>
    )
}

export default SingleItemPage