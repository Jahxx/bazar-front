import {useTheme} from "next-themes";
import {IconButton} from "@chakra-ui/react";
import {GiAztecCalendarSun, GiMoonOrbit} from "react-icons/gi";
import {useEffect} from "react";

const ColorModeToggle = () => {
    const { theme, setTheme } = useTheme()
    const toggleColorMode = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme!);
    }, [theme]);

    return (
        <IconButton variant="subtle" rounded="full" aria-label="toggle color mode" onClick={toggleColorMode}>
            {theme === "light" ? <GiMoonOrbit /> : <GiAztecCalendarSun />}
        </IconButton>
    )
}

export default ColorModeToggle;