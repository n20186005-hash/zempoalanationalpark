import { getTranslations } from 'next-intl/server';

const PARK_LAT = 19.0294;
const PARK_LON = -99.3199;

const API_URL =
  'https://api.open-meteo.com/v1/forecast?' +
  `latitude=${PARK_LAT}&longitude=${PARK_LON}` +
  '&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,uv_index' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset' +
  '&timezone=America%2FMexico_City&forecast_days=7&wind_speed_unit=kmh';

interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  uv_index: number;
}

interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
  sunrise: string[];
  sunset: string[];
}

interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyWeather;
}

type ConditionKey =
  | 'clear'
  | 'partlyCloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'showers'
  | 'snow'
  | 'thunderstorm'
  | 'thunderstormHail';

function conditionKey(code: number): ConditionKey {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partlyCloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code === 85 || code === 86) return 'snow';
  if (code === 95) return 'thunderstorm';
  if (code >= 96) return 'thunderstormHail';
  return 'cloudy';
}

type RainSeverity = 'none' | 'drizzle' | 'lightRain' | 'moderateRain' | 'heavyRain' | 'snow' | 'storm';

function codeSeverity(code: number): RainSeverity {
  if (code >= 95) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code === 65 || code === 66 || code === 67 || code === 82) return 'heavyRain';
  if ((code >= 61 && code <= 64) || code === 81) return 'moderateRain';
  if (code === 80) return 'lightRain';
  if (code >= 51 && code <= 57) return 'drizzle';
  return 'none';
}

interface TipSet {
  risks: string[];
  clothing: string[];
  activity: string[];
  items: string[];
}

function dedupe(list: string[]) {
  return [...new Set(list)];
}

function buildWeatherTips(d: WeatherResponse): TipSet {
  const cur = d.current;
  const dl = d.daily;
  const ck = conditionKey(cur.weather_code);
  const dk = conditionKey(dl.weather_code[0]);
  const curS = codeSeverity(cur.weather_code);
  const dayS = codeSeverity(dl.weather_code[0]);

  const tMax = dl.temperature_2m_max[0];
  const tMin = dl.temperature_2m_min[0];
  const diff = tMax - tMin;
  const prob = dl.precipitation_probability_max[0] ?? 0;
  const wind = dl.wind_speed_10m_max[0] ?? 0;
  const uvMax = dl.uv_index_max[0] ?? 0;
  const uvCur = cur.uv_index ?? 0;
  const wetKinds: RainSeverity[] = ['drizzle', 'lightRain', 'moderateRain', 'heavyRain'];
  const wetDay = wetKinds.includes(dayS);
  const wetNow = wetKinds.includes(curS);
  const storm = curS === 'storm' || dayS === 'storm';
  const sunnyNow = ck === 'clear' || ck === 'partlyCloudy';

  const risks: string[] = [];
  const clothing: string[] = [];
  const activity: string[] = [];
  const items: string[] = [];

  if (storm) risks.push('riskStorm');
  if (curS === 'heavyRain' || dayS === 'heavyRain') risks.push('riskHeavyRain');
  if (curS === 'snow' || dayS === 'snow' || tMin <= 0) risks.push('riskIce');
  if (wind >= 55) risks.push('riskWind');

  if (wetDay || wetNow || prob >= 60 || storm) clothing.push('cRainGear');
  if (diff >= 8) clothing.push('cLayers');
  if (tMax <= 10 || cur.temperature_2m <= 6) clothing.push('cCold');
  if (tMax >= 28) clothing.push('cHot');
  if (wind >= 35) clothing.push('cWindBreak');

  if (!storm) {
    if (dk === 'clear' || dk === 'partlyCloudy') activity.push('aSunny');
    else if (dk === 'fog' || ck === 'fog') activity.push('aFog');
    else if (dk === 'cloudy') activity.push('aCloudy');
    if (prob >= 60) activity.push('aRainPlan');
    if (curS === 'lightRain' || curS === 'moderateRain') activity.push('aRainNow');
    if (tMax >= 28) activity.push('aHotDay');
    if (wind >= 35 && wind < 55) activity.push('aWindNote');
  }

  if (wetDay || wetNow || prob >= 60 || storm) items.push('iPoncho');
  if (
    curS === 'moderateRain' ||
    curS === 'heavyRain' ||
    dayS === 'moderateRain' ||
    dayS === 'heavyRain'
  )
    items.push('iPoles');
  if (uvMax >= 7 || (uvCur >= 5 && sunnyNow)) items.push('iSunscreen');
  if (dk === 'clear' || dk === 'partlyCloudy' || tMax >= 24) items.push('iWater');
  if (diff >= 8 || tMin <= 6 || curS === 'snow' || dayS === 'snow') items.push('iExtraLayer');

  return {
    risks: dedupe(risks),
    clothing: dedupe(clothing),
    activity: dedupe(activity),
    items: dedupe(items),
  };
}

function AdviceBlock({
  label,
  lines,
  accent = 'var(--accent)',
  tone = 'plain',
}: {
  label: string;
  lines: string[];
  accent?: string;
  tone?: 'plain' | 'danger';
}) {
  if (!lines.length) return null;
  return (
    <div
      className={tone === 'danger' ? 'rounded-xl p-4 mb-4' : 'rounded-xl p-4'}
      style={
        tone === 'danger'
          ? { background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.35)' }
          : { background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }
      }
    >
      <p
        className="mb-3 text-sm font-semibold flex items-center gap-2"
        style={{ color: tone === 'danger' ? '#dc2626' : 'var(--text-primary)' }}
      >
        {tone === 'danger' ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 1.5 21h21L12 3z" />
            <path d="M12 10v4.5" />
            <path d="M12 17.6v.1" />
          </svg>
        ) : (
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: accent }} />
        )}
        {label}
      </p>
      <ul className="space-y-2">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={tone === 'danger' ? '#dc2626' : accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-1 flex-shrink-0"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDayLabel(dateStr: string, locale: string, isToday: boolean, todayLabel: string) {
  if (isToday) return todayLabel;
  const date = new Date(`${dateStr}T12:00:00Z`);
  try {
    return new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }).format(date);
  } catch {
    return dateStr.slice(5);
  }
}

export default async function WeatherSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'weather' });

  let data: WeatherResponse | null = null;
  try {
    const res = await fetch(API_URL, { next: { revalidate: 1800 } });
    if (res.ok) {
      data = (await res.json()) as WeatherResponse;
    }
  } catch {
    data = null;
  }

  const key = data ? conditionKey(data.current.weather_code) : 'cloudy';
  const dayTime = key === 'clear' || key === 'partlyCloudy';

  const tips = data ? buildWeatherTips(data) : null;
  const riskLines = tips ? tips.risks.map((id) => t(id)) : [];
  const clothingLines = tips ? tips.clothing.map((id) => t(id)) : [];
  const activityLines = tips ? tips.activity.map((id) => t(id)) : [];
  const itemLines = tips ? tips.items.map((id) => t(id)) : [];
  const hasAnyTip =
    riskLines.length > 0 || clothingLines.length > 0 || activityLines.length > 0 || itemLines.length > 0;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
        <p className="mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        {!data ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>{t('unavailable')}</p>
          </div>
        ) : (
          <>
            {/* Current conditions */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-6"
              style={{
                background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <WeatherIcon type={key} day={dayTime} size={72} />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {Math.round(data.current.temperature_2m)}
                      </span>
                      <span className="text-2xl font-semibold" style={{ color: 'var(--accent)' }}>
                        °C
                      </span>
                    </div>
                    <p className="mt-1 font-medium" style={{ color: 'var(--text-primary)' }}>
                      {t(`conditions.${key}`)}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t('updated')}: {data.current.time.slice(11)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <Metric label={t('feelsLike')} value={`${Math.round(data.current.apparent_temperature)}°`} />
                  <Metric label={t('humidity')} value={`${data.current.relative_humidity_2m}%`} />
                  <Metric label={t('wind')} value={`${Math.round(data.current.wind_speed_10m)} km/h`} />
                  <Metric
                    label={t('precipNow')}
                    value={data.current.precipitation > 0 ? `${data.current.precipitation.toFixed(1)} mm` : '0 mm'}
                  />
                  <Metric label={t('uvLabel')} value={`${Math.round(data.current.uv_index ?? 0)}`} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>
                  {t('sunrise')}: {data.daily.sunrise[0].slice(11)}
                </span>
                <span>
                  {t('sunset')}: {data.daily.sunset[0].slice(11)}
                </span>
                <span>
                  {t('maxTemp')} {Math.round(data.daily.temperature_2m_max[0])}° / {t('minTemp')}{' '}
                  {Math.round(data.daily.temperature_2m_min[0])}°
                </span>
                <span>
                  {t('precipChance')}: {data.daily.precipitation_probability_max[0] ?? '—'}%
                </span>
              </div>
            </div>

            {/* Smart visitor advice, generated from live conditions */}
            {tips && (
              <div
                className="rounded-2xl p-5 sm:p-6 mb-6"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent)' }}
              >
                <p
                  className="mb-4 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('adviceTitle')}
                </p>

                {hasAnyTip ? (
                  <>
                    <AdviceBlock label={t('riskTitle')} lines={riskLines} accent="#dc2626" tone="danger" />

                    <div
                      className="grid gap-3 sm:gap-4"
                      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
                    >
                      <AdviceBlock label={t('groupClothing')} lines={clothingLines} />
                      <AdviceBlock label={t('groupActivity')} lines={activityLines} />
                      <AdviceBlock label={t('groupItems')} lines={itemLines} />
                    </div>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t('fallbackNone')}
                  </p>
                )}
              </div>
            )}

            {/* 7-day forecast */}
            <p className="mb-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('week')}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {data.daily.time.map((day, i) => (
                <div
                  key={day}
                  className="flex-shrink-0 min-w-[96px] rounded-xl p-4 text-center"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {formatDayLabel(day, locale, i === 0, t('today'))}
                  </p>
                  <div className="flex justify-center mb-2">
                    <WeatherIcon type={conditionKey(data.daily.weather_code[i])} day size={34} />
                  </div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(data.daily.temperature_2m_max[i])}°{' '}
                    <span style={{ color: 'var(--text-muted)' }}>{Math.round(data.daily.temperature_2m_min[i])}°</span>
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
                    {data.daily.precipitation_probability_max[i] ?? '—'}%
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {Math.round(data.daily.wind_speed_10m_max[i])} km/h
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-xl p-5 flex items-start gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <path d="M12 3v3" />
                <path d="M12 18v3" />
                <path d="M3 12h3" />
                <path d="M18 12h3" />
                <path d="M5.6 5.6l2.1 2.1" />
                <path d="M16.3 16.3l2.1 2.1" />
                <path d="M5.6 18.4l2.1-2.1" />
                <path d="M16.3 7.7l2.1-2.1" />
              </svg>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('tip')}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg px-3 py-2 text-center"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </div>
  );
}

function WeatherIcon({ type, day = true, size = 48 }: { type: ConditionKey; day?: boolean; size?: number }) {
  const sun = '#f0b429';
  const cloud = 'var(--text-secondary)';
  const stroke = day ? cloud : 'var(--text-secondary)';
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke,
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (type === 'clear') {
    return (
      <svg {...common}>
        <circle cx="24" cy="24" r="7" fill={sun} stroke={sun} />
        <line x1="24" y1="6" x2="24" y2="12" stroke={sun} />
        <line x1="24" y1="36" x2="24" y2="42" stroke={sun} />
        <line x1="6" y1="24" x2="12" y2="24" stroke={sun} />
        <line x1="36" y1="24" x2="42" y2="24" stroke={sun} />
        <line x1="11.3" y1="11.3" x2="15.5" y2="15.5" stroke={sun} />
        <line x1="32.5" y1="32.5" x2="36.7" y2="36.7" stroke={sun} />
        <line x1="11.3" y1="36.7" x2="15.5" y2="32.5" stroke={sun} />
        <line x1="32.5" y1="15.5" x2="36.7" y2="11.3" stroke={sun} />
      </svg>
    );
  }

  if (type === 'partlyCloudy') {
    return (
      <svg {...common}>
        <circle cx="17" cy="15" r="6" fill={sun} stroke={sun} />
        <line x1="17" y1="4" x2="17" y2="7" stroke={sun} />
        <line x1="17" y1="23" x2="17" y2="26" stroke={sun} />
        <line x1="6" y1="15" x2="9" y2="15" stroke={sun} />
        <line x1="25" y1="15" x2="28" y2="15" stroke={sun} />
        <path d="M15 31h14a7 7 0 1 0-3.4-13 10 10 0 0 0-19.2 1.5A6.5 6.5 0 0 0 15 31z" />
      </svg>
    );
  }

  if (type === 'cloudy' || type === 'fog') {
    return (
      <svg {...common}>
        <path d="M13 33h19a9 9 0 1 0-2.9-17.5A12 12 0 0 0 17 12a11 11 0 0 0-4 21.2z" />
        {type === 'fog' && (
          <>
            <line x1="14" y1="39" x2="34" y2="39" />
            <line x1="18" y1="43" x2="30" y2="43" />
          </>
        )}
      </svg>
    );
  }

  const droplets = type === 'drizzle' || type === 'rain' || type === 'showers';
  const storm = type === 'thunderstorm' || type === 'thunderstormHail';
  const snowy = type === 'snow';
  const isShowers = type === 'showers';

  return (
    <svg {...common}>
      <path d="M12 31h21a8 8 0 1 0-2.6-15.6A11 11 0 0 0 9 13.5 9.5 9.5 0 0 0 12 31z" />
      {droplets && (
        <path
          d={isShowers ? 'M15 35l-2 6M21 35l-2 6M27 35l-2 6' : 'M14 35l-2 6M21 35l-2 6M28 35l-2 6'}
          strokeWidth="2"
        />
      )}
      {snowy && (
        <path d="M16 37l-1 5M23 37l-1 5M30 37l-1 5M19 39l2 2M26 39l2 2M19 42l-2-2M26 42l-2-2" strokeWidth="2" />
      )}
      {storm && (
        <path d="M17 31l-3 8h6l-2 8 8-11h-6l2-5z" strokeWidth="2" />
      )}
    </svg>
  );
}
