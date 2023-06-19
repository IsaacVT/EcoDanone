import { useQuery, gql } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// @mui
import {
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Stack,
    Box,
} from "@mui/material";
import CircleChart from "../../components/chart/cicrcleChart";
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

const query = gql`
    query Products {
        productCollection {
            items {
                titulo
                link
                imagen {
                    url
                }
                disponibleEn
                valorEnergtico
                grasas
                hidratosDeCarbono
                datosDelProducto {
                    json
                }
            }
        }
    }
`;

export const ProductsCard = () => {
    const { data, errors, loading } = useQuery(query);

    if (errors) {
        console.log(errors);
    }

    return loading ? (
        <h2>Loading products</h2>
    ) : (
        <Grid container spacing={2}>
            {data.productCollection.items.map((prod) => (
                <Grid key={prod.link} item md={6}>
                    <Card sx={{ maxWidth: 700, color: palette.danone[900] }}>
                        <CardMedia
                            sx={{
                                height: 300,
                                m: "0 10rem",
                            }}
                            image={prod.imagen.url}
                            title={prod.imagen.title}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {prod.titulo}
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                paddingY="2rem"
                            >
                                <CircleChart
                                    valor={prod.disponibleEn}
                                    abv={"gr"}
                                    titulo="Disponible en"
                                />
                                <CircleChart
                                    valor={prod.valorEnergtico}
                                    abv={"Kcal"}
                                    titulo="Valor Energtico"
                                />
                                <CircleChart
                                    valor={prod.grasas}
                                    abv={"g"}
                                    titulo="Grasas"
                                />
                                <CircleChart
                                    valor={prod.hidratosDeCarbono}
                                    abv={"g"}
                                    titulo="Hidratos de Carbono"
                                />
                            </Stack>
                            <Box sx={{ fontSize: "1.22rem" }}>
                                {documentToReactComponents(
                                    prod.datosDelProducto.json
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
