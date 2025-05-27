import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./pages/landing";
import StandardMode from "./pages/standard-mode";
import AdvancedMode from "./pages/advanced-mode";
import Processing from "./pages/processing";
import Success from "./pages/success";
import NotFound from "./pages/not-found";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/standard" component={StandardMode} />
      <Route path="/advanced" component={AdvancedMode} />
      <Route path="/processing/:jobId" component={Processing} />
      <Route path="/success/:jobId" component={Success} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;