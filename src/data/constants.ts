export const NAV_ITEMS = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "allowance", label: "Денежное довольствие", icon: "Banknote" },
  { id: "documents", label: "Документы", icon: "FileText" },
  { id: "service", label: "Служба", icon: "Shield" },
  { id: "schedule", label: "График службы", icon: "CalendarDays" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

export const ALLOWANCE_HISTORY = [
  { date: "25.03.2026", type: "Денежное довольствие", amount: "+89 450 ₽", status: "Выплачено" },
  { date: "25.02.2026", type: "Денежное довольствие", amount: "+89 450 ₽", status: "Выплачено" },
  { date: "10.02.2026", type: "Премия за выслугу", amount: "+24 000 ₽", status: "Выплачено" },
  { date: "25.01.2026", type: "Денежное довольствие", amount: "+89 450 ₽", status: "Выплачено" },
  { date: "15.01.2026", type: "Единовременная выплата", amount: "+45 000 ₽", status: "Выплачено" },
];

export const DOCUMENTS = [
  { name: "Контракт о прохождении военной службы", type: "Контракт", date: "12.01.2023", status: "Действующий" },
  { name: "Приказ о назначении на должность №847", type: "Приказ", date: "15.03.2024", status: "Исполнен" },
  { name: "Справка о прохождении службы", type: "Справка", date: "01.03.2026", status: "Актуальна" },
  { name: "Приказ о присвоении воинского звания", type: "Приказ", date: "20.11.2024", status: "Исполнен" },
  { name: "Медицинское заключение ВВК", type: "Справка", date: "10.02.2025", status: "Актуальна" },
];

export const AWARDS = [
  { name: "Медаль «За боевое содружество»", year: "2024", type: "Государственная" },
  { name: "Медаль «За отличие в военной службе» II ст.", year: "2023", type: "Ведомственная" },
  { name: "Грамота Министра обороны РФ", year: "2022", type: "Поощрение" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Плановое медицинское освидетельствование", text: "Необходимо пройти ВВК до 15 апреля 2026 г.", time: "2 часа назад", urgent: true },
  { id: 2, title: "Обновление персональных данных", text: "Проверьте актуальность сведений в личном деле.", time: "1 день назад", urgent: false },
  { id: 3, title: "Выплата денежного довольствия", text: "Зачислено 89 450 ₽ на счёт №****4821.", time: "5 дней назад", urgent: false },
  { id: 4, title: "Приказ о назначении дежурства", text: "Суточное дежурство 05.04.2026. Ознакомьтесь с документом.", time: "6 дней назад", urgent: false },
];

export const SCHEDULE = [
  { date: "01", day: "Пт", type: "service", label: "Служба" },
  { date: "02", day: "Сб", type: "off", label: "Выходной" },
  { date: "03", day: "Вс", type: "off", label: "Выходной" },
  { date: "04", day: "Пн", type: "service", label: "Служба" },
  { date: "05", day: "Вт", type: "duty", label: "Дежурство" },
  { date: "06", day: "Ср", type: "service", label: "Служба" },
  { date: "07", day: "Чт", type: "service", label: "Служба" },
  { date: "08", day: "Пт", type: "service", label: "Служба" },
  { date: "09", day: "Сб", type: "off", label: "Выходной" },
  { date: "10", day: "Вс", type: "off", label: "Выходной" },
  { date: "11", day: "Пн", type: "leave", label: "Отпуск" },
  { date: "12", day: "Вт", type: "leave", label: "Отпуск" },
  { date: "13", day: "Ср", type: "leave", label: "Отпуск" },
  { date: "14", day: "Чт", type: "leave", label: "Отпуск" },
];
