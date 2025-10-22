import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

// Import pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import OurWork from "@/pages/OurWork";
import Support from "@/pages/Support";
import GetInvolved from "@/pages/GetInvolved";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import SacredMap from "@/pages/SacredMap";

// Member Portal pages
import MemberLogin from "@/pages/MemberLogin";
import MemberRegister from "@/pages/MemberRegister";
import MemberDashboard from "@/pages/MemberDashboard";

// Import layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/our-work" component={OurWork} />
          <Route path="/support" component={Support} />
          <Route path="/get-involved" component={GetInvolved} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/sacred-map" component={SacredMap} />
          <Route path="/pilgrimage-guide" component={SacredMap} />
          
          {/* Member Portal Routes */}
          <Route path="/member-login" component={MemberLogin} />
          <Route path="/member-register" component={MemberRegister} />
          <Route path="/member-dashboard" component={MemberDashboard} />
          
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
