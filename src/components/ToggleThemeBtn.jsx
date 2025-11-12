import { useTheme } from "../context/Context"

const ToggleThemeBtn = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme}>
            {theme}
        </button>
    )
}

export default ToggleThemeBtn