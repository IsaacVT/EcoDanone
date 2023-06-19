// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import { Footer } from "./sections/footer/Footer";

// ----------------------------------------------------------------------

export default function App() {
    return (
        <ThemeProvider>
            <Router />
            <Footer />
        </ThemeProvider>
    );
}
