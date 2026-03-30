import Icon from "@/components/ui/icon";
import {
  ALLOWANCE_HISTORY,
  AWARDS,
  DOCUMENTS,
  NOTIFICATIONS,
  SCHEDULE,
} from "@/data/constants";

function StatusDot({ active }: { active: boolean }) {
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${active ? "bg-green-500" : "bg-muted-foreground"}`} />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-5 bg-accent rounded-sm" />
      <h2 className="font-display text-lg font-semibold uppercase tracking-wider text-foreground">{children}</h2>
    </div>
  );
}

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

function formatDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function calcService(startIso: string) {
  const start = new Date(startIso);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  const total = months < 0 ? years - 1 : years;
  const rem = ((months + 12) % 12);
  return `${total} лет ${rem} мес.`;
}

function DashboardSection({ soldier }: { soldier: Soldier }) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <Icon name="UserCircle2" size={48} className="text-primary/60" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                  {soldier.full_name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="badge-rank">{soldier.rank}</span>
                  <span className="text-sm text-muted-foreground">Личный номер: {soldier.personal_number}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <StatusDot active={true} />
                <span>На службе</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Должность:</span>{" "}
                <span className="font-medium text-foreground">{soldier.position}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Подразделение:</span>{" "}
                <span className="font-medium text-foreground">{soldier.division}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Воинская часть:</span>{" "}
                <span className="font-medium text-foreground">{soldier.unit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Дата рождения:</span>{" "}
                <span className="font-medium text-foreground">{formatDate(soldier.birth_date)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Начало службы:</span>{" "}
                <span className="font-medium text-foreground">{formatDate(soldier.service_start)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Выслуга:</span>{" "}
                <span className="font-medium text-foreground">{calcService(soldier.service_start)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <span className="section-label mb-0">Довольствие</span>
          <span className="font-display text-2xl font-bold text-foreground">89 450 ₽</span>
          <span className="text-xs text-green-600 font-medium">▲ +4.2% к прошлому</span>
        </div>
        <div className="stat-card">
          <span className="section-label mb-0">Выслуга лет</span>
          <span className="font-display text-2xl font-bold text-foreground">16.7</span>
          <span className="text-xs text-muted-foreground">лет календарных</span>
        </div>
        <div className="stat-card">
          <span className="section-label mb-0">Награды</span>
          <span className="font-display text-2xl font-bold text-foreground">3</span>
          <span className="text-xs text-muted-foreground">государственных и ведомств.</span>
        </div>
        <div className="stat-card border-l-2 border-l-accent">
          <span className="section-label mb-0">Уведомления</span>
          <span className="font-display text-2xl font-bold text-accent">1</span>
          <span className="text-xs text-accent font-medium">требует внимания</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded p-5">
        <SectionTitle>Важные уведомления</SectionTitle>
        <div className="space-y-3">
          {NOTIFICATIONS.filter(n => n.urgent).map(n => (
            <div key={n.id} className="flex items-start gap-3 p-3 bg-accent/8 border border-accent/20 rounded">
              <Icon name="AlertTriangle" size={16} className="text-accent mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.text}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 p-3 bg-muted/50 border border-border rounded">
            <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">Выплата довольствия</p>
              <p className="text-sm text-muted-foreground">Зачислено 89 450 ₽ на счёт №****4821.</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">5 дней назад</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllowanceSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card border-t-2 border-t-primary">
          <span className="section-label mb-0">Оклад по должности</span>
          <span className="font-display text-xl font-bold text-foreground">32 500 ₽</span>
        </div>
        <div className="stat-card border-t-2 border-t-primary">
          <span className="section-label mb-0">Оклад по званию</span>
          <span className="font-display text-xl font-bold text-foreground">14 000 ₽</span>
        </div>
        <div className="stat-card border-t-2 border-t-primary">
          <span className="section-label mb-0">Надбавки и выплаты</span>
          <span className="font-display text-xl font-bold text-foreground">42 950 ₽</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded p-5">
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>Состав выплаты — март 2026</SectionTitle>
        </div>
        <div className="space-y-2">
          {[
            { label: "Оклад по воинской должности", value: "32 500 ₽" },
            { label: "Оклад по воинскому званию", value: "14 000 ₽" },
            { label: "Надбавка за выслугу лет (50%)", value: "23 250 ₽" },
            { label: "Надбавка за особые условия (70%)", value: "32 550 ₽" },
            { label: "Надбавка за секретность (20%)", value: "6 500 ₽" },
            { label: "Надбавка за классность (30%)", value: "9 750 ₽" },
            { label: "НДФЛ (13%)", value: "−29 100 ₽" },
          ].map((row, i) => (
            <div key={i} className={`flex justify-between items-center py-2 ${i < 6 ? "border-b border-border" : ""}`}>
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className={`font-semibold text-sm ${row.value.startsWith("−") ? "text-accent" : "text-foreground"}`}>{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-primary">
            <span className="font-display font-bold uppercase tracking-wide text-foreground">К выплате</span>
            <span className="font-display text-xl font-bold text-primary">89 450 ₽</span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded p-5">
        <SectionTitle>История выплат</SectionTitle>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Наименование</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {ALLOWANCE_HISTORY.map((row, i) => (
                <tr key={i} className="hover:bg-muted/40 transition-colors">
                  <td className="text-muted-foreground">{row.date}</td>
                  <td>{row.type}</td>
                  <td className="font-semibold text-green-700 dark:text-green-400">{row.amount}</td>
                  <td><span className="badge-rank">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="bg-card border border-border rounded p-5">
      <SectionTitle>Документы</SectionTitle>
      <div className="overflow-x-auto">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Наименование документа</th>
              <th>Тип</th>
              <th>Дата</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc, i) => (
              <tr key={i} className="hover:bg-muted/40 transition-colors">
                <td>
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" size={14} className="text-muted-foreground shrink-0" />
                    <span>{doc.name}</span>
                  </div>
                </td>
                <td className="text-muted-foreground">{doc.type}</td>
                <td className="text-muted-foreground">{doc.date}</td>
                <td>
                  <span className={doc.status === "Действующий" || doc.status === "Актуальна" ? "badge-rank" : "text-xs text-muted-foreground"}>
                    {doc.status}
                  </span>
                </td>
                <td>
                  <button className="text-primary hover:text-primary/70 transition-colors">
                    <Icon name="Download" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServiceSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded p-5 space-y-4">
          <SectionTitle>Сведения о службе</SectionTitle>
          {[
            { label: "Дата начала военной службы", value: "01.09.2009" },
            { label: "Общая выслуга (календарная)", value: "16 лет 7 мес." },
            { label: "Выслуга в льготном исчислении", value: "21 год 3 мес." },
            { label: "Текущая должность с", value: "15.03.2024" },
            { label: "Форма допуска к секретности", value: "Форма 2" },
            { label: "Военно-учётная специальность", value: "021001" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded p-5">
          <SectionTitle>Участие в операциях</SectionTitle>
          <div className="space-y-3">
            {[
              { name: "Специальная военная операция", period: "2022 — н.в.", status: "Активно" },
              { name: "Миротворческая миссия (Нагорный Карабах)", period: "2020–2021", status: "Завершено" },
            ].map((op, i) => (
              <div key={i} className="p-3 bg-muted/50 border border-border rounded">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground leading-snug">{op.name}</p>
                  <span className={op.status === "Активно" ? "badge-alert shrink-0" : "badge-rank shrink-0"}>{op.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{op.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded p-5">
        <SectionTitle>Награды и поощрения</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {AWARDS.map((award, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded">
              <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                <Icon name="Award" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-snug">{award.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{award.year} · {award.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleSection() {
  const typeStyle: Record<string, string> = {
    service: "bg-primary text-primary-foreground",
    duty: "bg-accent text-white",
    off: "bg-muted text-muted-foreground",
    leave: "bg-yellow-600/20 text-yellow-700 dark:text-yellow-400 border border-yellow-600/30",
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded p-5">
        <SectionTitle>График — апрель 2026</SectionTitle>
        <div className="grid grid-cols-7 gap-2">
          {SCHEDULE.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground uppercase">{day.day}</span>
              <div className={`w-full aspect-square rounded flex items-center justify-center font-display font-bold text-sm ${typeStyle[day.type]}`}>
                {day.date}
              </div>
              <span className="text-[10px] text-muted-foreground text-center leading-tight hidden sm:block">{day.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-border">
          {[
            { type: "service", label: "Служба" },
            { type: "duty", label: "Дежурство" },
            { type: "leave", label: "Отпуск" },
            { type: "off", label: "Выходной" },
          ].map(({ type, label }) => (
            <div key={type} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-3 h-3 rounded ${typeStyle[type]}`} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <span className="section-label mb-0">Рабочих дней в апреле</span>
          <span className="font-display text-2xl font-bold text-foreground">22</span>
        </div>
        <div className="stat-card">
          <span className="section-label mb-0">Дней в отпуске</span>
          <span className="font-display text-2xl font-bold text-yellow-600 dark:text-yellow-400">4</span>
        </div>
        <div className="stat-card">
          <span className="section-label mb-0">Дежурства</span>
          <span className="font-display text-2xl font-bold text-accent">1</span>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="bg-card border border-border rounded p-5">
      <SectionTitle>Все уведомления</SectionTitle>
      <div className="space-y-3">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className={`flex items-start gap-4 p-4 border rounded transition-colors ${n.urgent ? "bg-accent/8 border-accent/20" : "bg-muted/30 border-border"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.urgent ? "bg-accent/20" : "bg-muted"}`}>
              <Icon name={n.urgent ? "AlertTriangle" : "Bell"} size={14} className={n.urgent ? "text-accent" : "text-muted-foreground"} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{n.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded p-5">
        <SectionTitle>Личные данные</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Фамилия", value: "Петров" },
            { label: "Имя", value: "Александр" },
            { label: "Отчество", value: "Николаевич" },
            { label: "Дата рождения", value: "14.07.1987" },
            { label: "Номер телефона", value: "+7 (999) 123-45-67" },
            { label: "Адрес регистрации", value: "г. Москва, ул. Ленина, д. 12" },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="mt-1 w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>
        <button className="mt-5 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded uppercase tracking-wide hover:bg-primary/90 transition-colors">
          Сохранить изменения
        </button>
      </div>

      <div className="bg-card border border-border rounded p-5">
        <SectionTitle>Безопасность</SectionTitle>
        <div className="space-y-3">
          {[
            { label: "Двухфакторная аутентификация", desc: "Подключена через SMS", active: true },
            { label: "Журнал входов", desc: "Последний вход: 31.03.2026, 09:14, Москва", active: null },
            { label: "Уведомления о входе", desc: "Отправляются на email", active: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              {item.active !== null && (
                <span className={item.active ? "badge-rank" : "text-xs text-muted-foreground border border-border rounded px-2 py-0.5"}>
                  {item.active ? "Включено" : "Выключено"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getSectionMap(soldier: Soldier): Record<string, React.ReactNode> {
  return {
    dashboard: <DashboardSection soldier={soldier} />,
    allowance: <AllowanceSection />,
    documents: <DocumentsSection />,
    service: <ServiceSection />,
    schedule: <ScheduleSection />,
    notifications: <NotificationsSection />,
    settings: <SettingsSection />,
  };
}