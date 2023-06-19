import { useQuery, gql } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import palette from "../../theme/palette";

const query = gql`
    query Sections {
        homeTextCollection {
            items {
                title
                text {
                    json
                }
                imageText {
                    url
                }
            }
        }
    }
`;

export const CardsHome = () => {
    const { data, errors, loading } = useQuery(query);

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        if (errors) {
            console.log(errors);
        }

        if (
            !loading &&
            data &&
            data.homeTextCollection &&
            data.homeTextCollection.items
        ) {
            let itemsObject = [...data.homeTextCollection.items];

            itemsObject.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });

            setObjects(itemsObject);
        }
    }, [data, errors, loading]);

    return (
        <div>
            {objects.map((section, index) => {
                const isLastSection = index === 4;
                const isEvenIndex = index % 2 === 0;
                const flexDirection = isEvenIndex ? "row-reverse" : "row";
                const padding = isEvenIndex ? "0 0 0 5rem" : "0 5rem 0 0";
                const textAlign = isLastSection ? "center" : "left";

                return (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: flexDirection,
                            alignItems: "center",
                            justifyContent: isLastSection
                                ? "center"
                                : "flex-start",
                            textAlign: textAlign,
                            p: 5,
                            mb: "5rem",
                            maxHeight: isLastSection ? 400 : 350,
                            overflow: "hidden",
                            backgroundColor: palette.danone[50],
                            borderRadius: "0.5rem",
                        }}
                    >
                        {!isLastSection && (
                            <>
                                <Box p={padding}>
                                    <img
                                        src={section.imageText.url}
                                        alt={section.title}
                                        style={{
                                            maxWidth: 400,
                                            height: "fit-content",
                                        }}
                                    />
                                </Box>
                                <Box sx={{ fontSize: "1.5rem" }}>
                                    {documentToReactComponents(
                                        section.text.json
                                    )}
                                </Box>
                            </>
                        )}

                        {isLastSection && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={{ fontSize: "1.5rem" }}>
                                    {documentToReactComponents(
                                        section.text.json
                                    )}
                                </Box>
                                <img
                                    src={section.imageText.url}
                                    alt={section.title}
                                    style={{
                                        width: 300,
                                        height: "fit-content",
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                );
            })}
        </div>
    );
};
