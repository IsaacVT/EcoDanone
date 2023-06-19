import { alpha } from "@mui/material/styles";
import palette from "../palette";
import customShadows from "../customShadows";

// ----------------------------------------------------------------------

export default function Button() {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
                sizeLarge: {
                    height: 48,
                },
                containedInherit: {
                    color: palette.grey[800],
                    boxShadow: customShadows.z8,
                    "&:hover": {
                        backgroundColor: palette.grey[400],
                    },
                },
                containedPrimary: {
                    boxShadow: customShadows.primary,
                },
                containedSecondary: {
                    boxShadow: customShadows.secondary,
                },
                outlinedInherit: {
                    border: `1px solid ${alpha(palette.grey[500], 0.32)}`,
                    "&:hover": {
                        backgroundColor: palette.action.hover,
                    },
                },
                textInherit: {
                    "&:hover": {
                        backgroundColor: palette.action.hover,
                    },
                },
            },
        },
    };
}
