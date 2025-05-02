import "./App.css";
import { AppFooter } from "./components/footer/footer";
import { AppHeader } from "./components/header/header";
import { StoreFront } from "./components/storefront/storefront";

function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <AppHeader />
      <StoreFront />
      <AppFooter />
    </div>
  );
}

export default App;
