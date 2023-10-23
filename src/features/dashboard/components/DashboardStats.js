function DashboardStats({ title, value }) {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div className={`stat-value dark:text-slate-300 text-primary }`}>
          Rs.{new Intl.NumberFormat().format(value)}
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
