import FeaturedImage from "../utilities/FeaturedImage";
// If there is a video, display it, else, display the featured image. 
// If neither exists, display a placeholder

const ProjectMedia = ({ projectData, noMotionPreference, figureStyle }) => {


    if (projectData.acf?.demo_video?.url) {
        return (
            <figure className={figureStyle}>
                <video
                    src={projectData.acf.demo_video.url}
                    loop
                    muted
                    playsInline
                    autoPlay={noMotionPreference}
                    aria-label={`Demo video for project: ${projectData.title.rendered}`}
                />
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

                    src="assets/placeholder.png"
                    alt="Placeholder image: no media available for this project"
                />
            </figure>
        );
    }

}

export default ProjectMedia