import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import Layout from "@/components/Layout";

interface Soldier {
  id: number;
  personal_number: string;
  full_name: string;
  rank: string;
  position: string;
  unit: string;
  division: string;
  birth_date: string;
  service_start: string;
}

export default function App() {
  const [soldier, setSoldier] = useState<Soldier | null>(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!soldier) {
    return <LoginPage onLogin={(s) => setSoldier(s)} />;
  }

  const handleLogout = () => {
    setSoldier(null);
    setActiveSection("dashboard");
    setSidebarOpen(false);
  };

  return (
    <Layout
      soldier={soldier}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      onLogout={handleLogout}
    />
  );
}
