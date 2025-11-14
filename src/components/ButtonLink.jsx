import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const ButtonLink = ({ color = "plain", label, isInternal, link }) => {

    if (isInternal) {
        return (
            <Link to={link} className={` ${color} button-link`}>
                {label}

            </Link>
        )
    } else {
        return (
            <a href={link} className={` ${color} button-link`} target="_blank" rel="noopener noreferrer">

                {label}
            </a>

        )
    }
}

ButtonLink.propTypes = {
    color: PropTypes.oneOf(["color", "plain"]),
    label: PropTypes.string.isRequired,
    isInternal: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired
};

export default ButtonLink