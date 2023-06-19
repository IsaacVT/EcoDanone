import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
// @mui
import { Box, Link } from "@mui/material";
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

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
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
                item.title.includes("navbar")
            );

            if (logoItem) {
                setImage(logoItem.url);
            }
        }
    }, [data, errors, loading]);

    const logo = (
        <Box
            component="img"
            src={image}
            alt="logo"
            sx={{
                display: "flex",
                width: 200,
                height: "fit-content",
                marginRight: "2.5rem",
                ...sx,
            }}
        />
    );

    if (disabledLink) {
        return <>{logo}</>;
    }

    return <Link sx={{ display: "contents" }}>{logo}</Link>;
});

Logo.propTypes = {
    sx: PropTypes.object,
    disabledLink: PropTypes.bool,
};

export default Logo;
