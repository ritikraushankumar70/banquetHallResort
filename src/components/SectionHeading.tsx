export default function SectionHeading({
  title,
  subtitle,
  centered = true
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-5 ${centered ? 'text-center' : ''}`}>
      {subtitle && <p className="text-gold text-uppercase fw-bold letter-spacing-2 mb-2">{subtitle}</p>}
      <h2 className="display-5 fw-bold mb-3">{title}</h2>
      <div className={`mx-${centered ? 'auto' : '0'} bg-gold`} style={{ height: '3px', width: '60px', backgroundColor: 'var(--rv-gold)' }}></div>
    </div>
  );
}
