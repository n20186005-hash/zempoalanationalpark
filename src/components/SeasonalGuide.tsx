import { useTranslations, useMessages } from 'next-intl';

interface SeasonRow {
  id: string;
  period: string;
  season: string;
  weather: string;
  water: string;
  wildlife: string;
  tips: string;
}

export default function SeasonalGuide() {
  const t = useTranslations('seasonalGuide');
  const messages = useMessages() as any;
  const rows: SeasonRow[] = messages?.seasonalGuide?.rows || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-10 leading-relaxed max-w-4xl" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="overflow-x-auto pb-2">
          <table
            className="w-full min-w-[900px] border-collapse rounded-xl overflow-hidden text-sm"
            style={{ borderCollapse: 'separate', borderSpacing: 0, border: '1px solid var(--border-color)' }}
          >
            <thead>
              <tr style={{ background: 'var(--accent)' }}>
                <th className="text-left p-4 font-semibold text-white" scope="col">
                  {t('columns.season')}
                </th>
                <th className="text-left p-4 font-semibold text-white" scope="col">
                  {t('columns.weather')}
                </th>
                <th className="text-left p-4 font-semibold text-white" scope="col">
                  {t('columns.water')}
                </th>
                <th className="text-left p-4 font-semibold text-white" scope="col">
                  {t('columns.wildlife')}
                </th>
                <th className="text-left p-4 font-semibold text-white" scope="col">
                  {t('columns.tips')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  <td className="p-4 align-top">
                    <span
                      className="inline-block rounded-lg px-3 py-1 font-bold mb-2"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      {row.period}
                    </span>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {row.season}
                    </p>
                  </td>
                  <td className="p-4 align-top leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {row.weather}
                  </td>
                  <td className="p-4 align-top leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {row.water}
                  </td>
                  <td className="p-4 align-top leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {row.wildlife}
                  </td>
                  <td className="p-4 align-top leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {row.tips}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
