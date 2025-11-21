import { fetchData } from "../utilities/GlobalUtils";
import { REST_BASE } from "../utilities/GlobalVariables";
import { useState, useEffect } from "react";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "./ErrorPage";
import styles from '../styles/modules/projects.module.css'
import ProjectMedia from "../components/ProjectMedia";
import ButtonLink from "../components/ButtonLink";

const ProjectsPage = () => {
    const restPath = REST_BASE + 'posts?_embed';
    const [allProjects, setAllProjects] = useState([]);

    // Page State
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(404);

    // Filter
    const [technologies, setTechnologies] = useState([]);
    const [roles, setRoles] = useState([]);
    const [activeFilters, setActiveFilters] = useState({ tech: [], role: [] });
    const [currentProjects, setCurrentProjects] = useState([]);

    // Accessibility
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchData(restPath);
                const tech = await fetchData(REST_BASE + 'mel-technology');
                const role = await fetchData(REST_BASE + 'mel-role');

                setAllProjects(data);
                setCurrentProjects(data);

                setTechnologies(tech);
                setRoles(role);

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

    }, [restPath])



    useEffect(() => {
        function isIncluded(project) {
            const projectTech = project["mel-technology"];
            const projectRole = project["mel-role"];

            const techMatch = activeFilters.tech.every(t => projectTech.includes(Number(t)));
            const roleMatch = activeFilters.role.every(r => projectRole.includes(Number(r)));

            return techMatch && roleMatch;
        }

        setCurrentProjects(allProjects.filter(isIncluded));
    }, [activeFilters, allProjects]);

    if (!isLoaded) {
        return (<LoadingPage />)
    }

    if (error) {
        return (
            <ErrorPage errorCode={errorCode} />
        )
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "role") {
            const index = activeFilters.role.indexOf(value);

            if (index > -1) { // In array, remove
                setActiveFilters({ tech: [...activeFilters.tech], role: activeFilters.role.toSpliced(index, 1) });
            } else { // Not in array, add
                setActiveFilters({ tech: [...activeFilters.tech], role: [...activeFilters.role, value] })
            }
        } else {
            const index = activeFilters.tech.indexOf(value);

            if (index > -1) {  // In array, remove
                setActiveFilters({ tech: activeFilters.tech.toSpliced(index, 1), role: [...activeFilters.role] });
            } else { // Not in array, add
                setActiveFilters({ tech: [...activeFilters.tech, value], role: [...activeFilters.role] })
            }
        }

    };

    const clearFilters = () => {
        setActiveFilters({ tech: [], role: [] });
        setCurrentProjects(allProjects);
    };

    return (
        <main id="site-main">

            <aside>
                <h2>Filters</h2>

                <fieldset>
                    <legend> Technologies</legend>
                    <div>
                        {technologies.map((tech) => (
                            <div className={styles.technology} key={tech.id}>
                                <input
                                    type="checkbox"
                                    name="tech"
                                    id={`tech-${tech.id}`}
                                    value={tech.id}
                                    checked={activeFilters.tech.includes(String(tech.id))}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`tech-${tech.id}`}>
                                    {tech.name}
                                </label>
                            </div>
                        ))}

                    </div>
                </fieldset>

                <fieldset>
                    <legend>Roles</legend>
                    <div>
                        {roles.map((role) => (
                            <div className={styles.role} key={role.id}>
                                <input
                                    type="checkbox"
                                    name="role"
                                    id={`role-${role.id}`}
                                    value={role.id}
                                    checked={activeFilters.role.includes(String(role.id))}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`role-${role.id}`}>
                                    {role.name}
                                </label>
                            </div>
                        ))}

                    </div>
                </fieldset>

                <button onClick={clearFilters}>
                    Clear Filters
                </button>

            </aside>

            <div>
                <h1>My Projects</h1>
                <div aria-live='polite' role='region'>
                    <p>Projects Displayed: {currentProjects.length}</p>
                </div>

                <div>
                    {
                        currentProjects.length > 0 &&
                        currentProjects.map((project) => {
                            const roles = project._embedded['wp:term'][0];
                            let roles_string = "";
                            roles.map((role) => roles_string += (role.name + ", "));
                            roles_string = roles_string.slice(0, -2); //remove trailing comma and space

                            const tech = project._embedded['wp:term'][1];

                            return (
                                <article key={project.id} className={styles.project_card}>
                                    <ProjectMedia projectData={project} noMotionPreference={noMotionPreference} figureStyle={styles.project_fig} />

                                    <div className={styles.card_content}>
                                        <h3>{project.title.rendered}</h3>
                                        <ul>
                                            {tech.map((t) => (<li key={t.id} className="tech-chip">{t.name}</li>))}
                                        </ul>
                                        <p ><strong>{roles_string}</strong> </p>
                                        <p className={styles.proj_tagline}>{project.acf.tagline}</p>
                                        <ButtonLink color="plain" label="✦ View Project ✦" isInternal={true} link={`/projects/${project.id}`} />
                                    </div>
                                </article>)
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default ProjectsPage