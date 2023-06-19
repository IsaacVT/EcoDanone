import { Helmet } from "react-helmet-async";
import { Container, Typography } from "@mui/material";
import { ProductsCard } from "../sections/products";

export default function Products() {
    return (
        <>
            <Helmet>
                <title>Eco Danone | Productos</title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Lista de Productos
                </Typography>

                <ProductsCard />
            </Container>
        </>
    );
}
