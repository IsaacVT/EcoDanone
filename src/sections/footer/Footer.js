import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import palette from "../../theme/palette";
import { useQuery, gql } from "@apollo/client";

// ----------------------------------------------------------------------

const query = gql`
    query LogoImage {
        assetCollection {
            items {
                title
                url
            }
        }
    }
`;

export const Footer = () => {
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
                item.title.includes("footer")
            );

            if (logoItem) {
                setImage(logoItem.url);
            }
        }
    }, [data, errors, loading]);
    return (
        <Box
            component="footer"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2rem 15rem",
                backgroundColor: palette.danone[200],
                color: palette.danone[900],
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "3rem",
                    alignItems: "flex-start",
                }}
            >
                <Button
                    component={Link}
                    href="https://github.com/IsaacVT"
                    sx={{
                        color: palette.danone[900],
                        fontSize: "1.5rem",
                    }}
                    endIcon={<GitHubIcon />}
                >
                    Github
                </Button>
                <Button
                    component={Link}
                    href="https://linkedin.com/in/isaac-vt"
                    sx={{
                        color: palette.danone[900],
                        fontSize: "1.5rem",
                    }}
                    endIcon={<LinkedInIcon />}
                >
                    LinkedIn
                </Button>
            </Box>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                }}
            >
                Desarrollado por Isaac VT <br /> para el Hackathon de DANONE
                2023
            </Typography>
            <Box>
                <img
                    src={image}
                    alt="DANONE"
                    style={{ width: 100, cursor: "pointer" }}
                    onClick={() => {
                        window.open("https://www.danone.es/");
                    }}
                />
            </Box>
        </Box>
    );
};
