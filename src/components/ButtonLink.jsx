import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const ButtonLink = ({ color = "plain", label, isInternal, link, style }) => {

    if (isInternal) {
        return (
            <Link to={link} className={` ${color} button-link`} style={style}>
                {label}

            </Link>
        )
    } else {
        return (
            <a href={link} className={` ${color} button-link`} style={style} target="_blank" rel="noopener noreferrer">

                {label}
            </a>

        )
    }
}

ButtonLink.propTypes = {
    color: PropTypes.oneOf(["color", "plain"]),
    label: PropTypes.string.isRequired,
    isInternal: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    style: PropTypes.object
};

export default ButtonLink