import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!number.trim() || !password.trim()) {
      setError("Заполните все поля.");
      return;
    }
    if (!/^[А-Яа-яA-Za-z]-\d{6}$/.test(number.trim())) {
      setError("Формат личного номера: А-271439");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-mil-dark dark flex flex-col items-center justify-center px-4">
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-4">
          <span className="font-display font-bold text-2xl text-primary tracking-widest">МО</span>
        </div>
        <p className="font-display font-bold text-base uppercase tracking-[0.25em] text-foreground text-center">
          Министерство обороны
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">Российской Федерации</p>
        <div className="w-32 h-px bg-border mt-4" />
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-3">
          Личный кабинет военнослужащего
        </p>
      </div>

      <div className="w-full max-w-sm bg-card border border-border rounded">
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Icon name="Lock" size={14} className="text-primary" />
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Авторизация
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Личный номер
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Icon name="IdCard" size={15} className="text-muted-foreground" fallback="CreditCard" />
              </div>
              <input
                type="text"
                value={number}
                onChange={e => setNumber(e.target.value.toUpperCase())}
                placeholder="А-271439"
                maxLength={8}
                className="w-full bg-background border border-border rounded pl-9 pr-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-widest"
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Формат: Буква-6 цифр (пример: А-271439)</p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Icon name="KeyRound" size={15} className="text-muted-foreground" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded pl-9 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={15} />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/30 rounded text-sm text-accent">
              <Icon name="AlertCircle" size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-widest py-3 rounded hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={15} className="animate-spin" />
                Проверка...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={15} />
                Войти
              </>
            )}
          </button>
        </form>

        <div className="px-6 pb-5">
          <div className="flex items-start gap-2 p-3 bg-muted/40 rounded border border-border">
            <Icon name="ShieldCheck" size={13} className="text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Доступ только для действующих военнослужащих. Все действия в системе протоколируются.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-8 text-xs text-muted-foreground">
        <Icon name="Lock" size={11} className="text-green-600" />
        Защищённое соединение · TLS 1.3
      </div>
    </div>
  );
}
