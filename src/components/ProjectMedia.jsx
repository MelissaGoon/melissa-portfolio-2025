import FeaturedImage from "../utilities/FeaturedImage";
// If there is a video, display it, else, display the featured image. 
// If neither exists, display a placeholder

const ProjectMedia = ({ projectData, figureStyle }) => {
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (projectData.acf?.demo_video?.url) {
        return (
            <figure className={figureStyle}>
                <video
                    src={projectData.acf.demo_video.url}
                    loop
                    muted
                    playsInline
                    autoPlay={noMotionPreference}
                    controls
                    aria-label={projectData.acf.demo_video.description}
                    draggable="false"
                />
                <figcaption className="screen-reader-text">{`Demo video for project: ${projectData.title.rendered}`}</figcaption>
            </figure>
        );
    } else if (projectData.featured_media !== 0 && projectData._embedded) {
        return (
            <FeaturedImage
                className={figureStyle}
                featuredImageObject={projectData._embedded["wp:featuredmedia"][0]}
            />
        );
    } else {
        return (
            <figure className={figureStyle}>
                <img
                    draggable="false"
                    src="assets/placeholder.png"
                    alt="Placeholder image: no media available for this project"
                />
                <figcaption className="screen-reader-text">Placeholder Image</figcaption>
            </figure>
        );
    }

}

export default ProjectMedia