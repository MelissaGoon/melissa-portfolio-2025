import ProjectMedia from "./ProjectMedia";
import ButtonLink from "./ButtonLink";

const ProjectCard = ({ project, styles, buttonLabel, buttonColor = "plain", buttonSize = "regular" }) => {
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;


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
                <ButtonLink color={buttonColor} label={buttonLabel} isInternal={true} link={`/projects/${project.id}`} size={buttonSize} />
            </div>
        </article>)
}

export default ProjectCard