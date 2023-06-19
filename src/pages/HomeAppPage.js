import { Helmet } from "react-helmet-async";
// @mui
import { Container } from "@mui/material";
import { CardsHome } from "../sections/cardsHome";

export default function HomeAppPage() {
    return (
        <>
            <Helmet>
                <title> Eco Danone </title>
            </Helmet>

            <Container maxWidth="xl" className="Sections">
                <CardsHome />
            </Container>
        </>
    );
}
