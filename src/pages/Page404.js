import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 580,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(10, 0),
}));

// ----------------------------------------------------------------------

const query = gql`
    query NotFoundImage {
        assetCollection {
            items {
                title
                url
            }
        }
    }
`;

export default function Page404() {
    const { data, errors, loading } = useQuery(query);
    const [image, setImage] = useState("");

    useEffect(() => {
        if (errors) {
            console.log(errors);
        }

        if (
            !loading &&
            data &&
            data.assetCollection &&
            data.assetCollection.items
        ) {
            const logoItem = data.assetCollection.items.find((item) =>
                item.title.includes("found")
            );

            if (logoItem) {
                setImage(logoItem.url);
            }
        }
    }, [data, errors, loading]);

    return (
        <>
            <Helmet>
                <title> 404 Page Not Found </title>
            </Helmet>

            <Container>
                <StyledContent
                    sx={{ textAlign: "center", alignItems: "center" }}
                >
                    <Typography variant="h3" paragraph>
                        Lamentamos que esto nos ocurra, esperamos arreglarlo
                        pronto.
                    </Typography>

                    <Box
                        component="img"
                        src={image}
                        sx={{
                            height: "auto",
                            m: "none",
                        }}
                    />

                    <Button
                        to="/home"
                        size="large"
                        variant="contained"
                        component={RouterLink}
                    >
                        Regresar
                    </Button>
                </StyledContent>
            </Container>
        </>
    );
}
