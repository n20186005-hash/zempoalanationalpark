import { useTranslations, useMessages } from 'next-intl';

interface PlanStep {
  time: string;
  text: string;
}

interface Plan {
  id: string;
  title: string;
  duration: string;
  steps: PlanStep[];
}

export default function ItinerarySection() {
  const t = useTranslations('itinerary');
  const messages = useMessages() as any;
  const plans: Plan[] = messages?.itinerary?.plans || [];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {plan.title}
                </h3>
                <span
                  className="text-xs font-semibold rounded-full px-3 py-1 flex-shrink-0"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                >
                  {plan.duration}
                </span>
              </div>

              <ol className="space-y-0">
                {plan.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 pb-5 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span
                        className="flex-shrink-0 w-16 text-center text-xs font-bold rounded-lg px-2 py-1"
                        style={{ background: 'var(--accent)', color: 'white' }}
                      >
                        {step.time}
                      </span>
                      {i < plan.steps.length - 1 && (
                        <span className="w-px flex-1 my-1" style={{ background: 'var(--border-color)' }} />
                      )}
                    </div>
                    <p className="text-sm leading-relaxed pt-1" style={{ color: 'var(--text-secondary)' }}>
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
