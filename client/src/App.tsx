import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Landing from "./pages/landing";
import StandardMode from "./pages/standard-mode";
import AdvancedMode from "./pages/advanced-mode";
import CreateResume from "./pages/create-resume";
import Processing from "./pages/processing";
import Success from "./pages/success";
import HowItWorks from "./pages/how-it-works";
import Examples from "./pages/examples";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/examples" component={Examples} />
      <Route path="/standard" component={StandardMode} />
      <Route path="/advanced" component={AdvancedMode} />
      <Route path="/create" component={CreateResume} />
      <Route path="/processing/:jobId" component={Processing} />
      <Route path="/success/:jobId" component={Success} />
      {/* Fallback to 404 */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
