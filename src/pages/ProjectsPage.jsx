import { fetchData } from "../utilities/GlobalUtils";
import { REST_BASE } from "../utilities/GlobalVariables";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import styles from '../styles/modules/projects.module.css'
import ProjectCard from "../components/ProjectCard";

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
        <main id="site-main" className={styles.projects_page}>

            <aside className={styles.filter_container}>
                <h1>My Projects ✦</h1>
                <h2>Filters</h2>

                <fieldset className={styles.filter_field}>
                    <legend> Technologies</legend>
                    <div className={styles.checkbox_container}>
                        {technologies.map((tech) => (
                            <div className={styles.checkbox} key={tech.id}>
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

                <fieldset className={styles.filter_field}>
                    <legend>Roles</legend>
                    <div className={styles.checkbox_container}>
                        {roles.map((role) => (
                            <div className={styles.checkbox} key={role.id}>
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

                <button onClick={clearFilters} className={styles.clear_filters}>
                    Clear Filters
                </button>

            </aside>

            <div className={styles.content_container}>

                <div className="screen-reader-text" aria-live='polite' role='region'>
                    <p>Projects Displayed: {currentProjects.length}</p>
                </div>

                <div className={styles.projects_container}>
                    {
                        currentProjects.length > 0 &&
                        currentProjects.map((project) => (<ProjectCard key={project.id} project={project} styles={styles} buttonLabel="View Project →" buttonColor="color" buttonSize="small" />))
                    }

                    {
                        currentProjects.length === 0 &&
                        <p className={styles.empty}> Nothing matches those filters, try giving them a tweak to explore more projects!</p>
                    }
                </div>
            </div>
        </main>
    )
}

export default ProjectsPage