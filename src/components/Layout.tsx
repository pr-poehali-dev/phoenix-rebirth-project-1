import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "@/data/constants";
import { getSectionMap } from "@/components/Dashboard";

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

function Emblem() {
  return (
    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-primary/40 shrink-0">
      <span className="text-primary-foreground font-display font-bold text-sm tracking-wider">МО</span>
    </div>
  );
}

function shortName(fullName: string) {
  const parts = fullName.trim().split(" ");
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.${parts[2] ? parts[2][0] + "." : ""}`;
}

interface LayoutProps {
  soldier: Soldier;
  activeSection: string;
  setActiveSection: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

export default function Layout({
  soldier,
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
}: LayoutProps) {
  const currentNav = NAV_ITEMS.find(n => n.id === activeSection)!;
  const sectionMap = getSectionMap(soldier);

  return (
    <div className="min-h-screen bg-background dark flex flex-col">
      <header className="h-14 bg-mil-dark border-b border-border flex items-center px-4 gap-4 shrink-0 z-40">
        <button
          className="lg:hidden p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Icon name="Menu" size={20} />
        </button>
        <div className="flex items-center gap-3">
          <Emblem />
          <div className="hidden sm:block">
            <p className="font-display font-bold text-sm uppercase tracking-widest text-foreground leading-none">
              Министерство обороны
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Российской Федерации</p>
          </div>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground border border-border rounded px-3 py-1.5">
          <Icon name="Lock" size={12} className="text-green-600" />
          Защищённое соединение
        </div>
        <div className="relative">
          <button className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Bell" size={18} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Icon name="User" size={14} className="text-primary" />
          </div>
          <span className="hidden sm:block text-sm font-medium text-foreground">{shortName(soldier.full_name)}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed lg:relative top-14 lg:top-0 left-0 h-[calc(100vh-3.5rem)] lg:h-auto
          w-64 bg-mil-dark border-r border-border z-30
          flex flex-col shrink-0 overflow-y-auto
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <nav className="p-3 flex-1">
            <p className="section-label px-4 pt-2">Навигация</p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`sidebar-item w-full text-left ${activeSection === item.id ? "active" : "text-muted-foreground"}`}
              >
                <Icon name={item.icon} size={16} fallback="Circle" />
                <span>{item.label}</span>
                {item.id === "notifications" && (
                  <span className="ml-auto w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</span>
                )}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <button onClick={onLogout} className="sidebar-item w-full text-left text-muted-foreground hover:text-accent">
              <Icon name="LogOut" size={16} />
              <span>Выйти</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-5 md:p-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Icon name="Home" size={12} />
              <span>Личный кабинет</span>
              <span>/</span>
              <span className="text-foreground font-medium">{currentNav.label}</span>
            </div>

            {sectionMap[activeSection]}
          </div>
        </main>
      </div>

      <footer className="h-10 bg-mil-dark border-t border-border flex items-center justify-between px-6 shrink-0">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">МО РФ · Личный кабинет военнослужащего</span>
        <span className="text-xs text-muted-foreground">v2.4.1 · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
