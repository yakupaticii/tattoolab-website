import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Kvkk from "./pages/Kvkk";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import FontGenerator from "./pages/FontGenerator";
import { IdeaPage, IdeasHub } from "./pages/TattooIdeas";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/kvkk" component={Kvkk} />
      <Route path="/terms" component={Terms} />
      <Route path="/support" component={Support} />
      <Route path="/tattoo-font-generator" component={FontGenerator} />
      <Route path="/tattoo-ideas" component={IdeasHub} />
      <Route path="/tattoo-ideas/:slug">{params => <IdeaPage slug={params.slug} />}</Route>
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
