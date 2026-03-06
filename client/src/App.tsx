import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import DesignStudio from "./pages/DesignStudio";
import AgingSimulator from "./pages/AgingSimulator";
import CoverUpAdvisor from "./pages/CoverUpAdvisor";
import TattooCare from "./pages/TattooCare";
import Auth from "./pages/Auth";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/design" component={DesignStudio} />
      <Route path="/aging" component={AgingSimulator} />
      <Route path="/cover-up" component={CoverUpAdvisor} />
      <Route path="/care" component={TattooCare} />
      <Route path="/auth" component={Auth} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/support" component={Support} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
