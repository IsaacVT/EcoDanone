import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, Button } from "@mui/material";
// Components
import Logo from "../logo";
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

NavSection.propTypes = {
    data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
    return (
        <Box
            {...other}
            sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box>
                <Logo />
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                }}
            >
                {data.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </Box>
        </Box>
    );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
};

function NavItem({ item }) {
    const { title, path, icon } = item;

    return (
        <>
            <Button
                component={RouterLink}
                to={path}
                sx={{
                    color: palette.danone[900],
                    display: "block",
                    textTransform: "capitalize",
                    p: 3,
                    margin: "0 1rem",
                    fontSize: "1.2rem",
                }}
                endIcon={icon}
            >
                {title}
            </Button>
        </>
    );
}
