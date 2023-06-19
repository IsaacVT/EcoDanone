import { AppBar, Toolbar, Container } from "@mui/material";
// Components
import NavSection from "../../../components/nav-section";
//
import navConfig from "./configureNav";
import palette from "../../../theme/palette";

export default function Nav() {
    return (
        <AppBar position="static" sx={{ backgroundColor: palette.danone[200] }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavSection data={navConfig} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
