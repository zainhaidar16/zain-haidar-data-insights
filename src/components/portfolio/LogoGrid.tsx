type LogoItem = {
  name: string;
  logo: string;
  description?: string;
};

export function LogoGrid({ items }: { items: LogoItem[] }) {
  return (
    <div className="logo-grid">
      {items.map((item) => (
        <article key={item.name} className="logo-card">
          <div className="logo-card-mark">
            <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
          </div>
          <h3>{item.name}</h3>
          {item.description && <p>{item.description}</p>}
        </article>
      ))}
    </div>
  );
}
