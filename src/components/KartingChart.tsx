import React, { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    ReferenceLine,
} from 'recharts';
import kartingData from '../data/karting.json';

type Session = typeof kartingData[number];
type ViewMode = 'laps' | 'sessions' | 'consistency';

// Parse "1:04.515" → seconds as number (64.515)
const parseTime = (t: string): number => {
    const parts = t.split(':');
    if (parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
    }
    return parseFloat(t);
};

// Format seconds back to "1:04.515"
const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const rest = (secs % 60).toFixed(3);
    return `${mins}:${rest.padStart(6, '0')}`;
};

const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
};

// --- Per-Lap View: shows lap times for a selected session ---
function LapsView({ data }: { data: Session[] }) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const session = data[selectedIdx];

    const chartData = session.laps.map((lap, i) => ({
        lap: i + 1,
        time: parseTime(lap),
        label: lap,
    }));

    const bestLapTime = parseTime(session.bestLap);
    const avgLapTime = parseTime(session.lapAvg);

    return (
        <div>
            {/* Session selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {data.map((s, i) => (
                    <button
                        key={s.session}
                        onClick={() => setSelectedIdx(i)}
                        className={`
                            flex-shrink-0 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border transition-all
                            ${selectedIdx === i
                                ? 'bg-hud-accent text-white border-hud-accent'
                                : 'bg-hud-black/50 text-hud-muted border-hud-border hover:border-hud-accent hover:text-hud-text'}
                        `}
                    >
                        #{s.session} — {formatDate(s.date)}
                    </button>
                ))}
            </div>

            {/* Session meta */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4 text-center">
                <MiniStat label="Best Lap" value={session.bestLap} accent />
                <MiniStat label="Avg Lap" value={session.lapAvg} />
                <MiniStat label="Cons." value={session.consistency.toFixed(3)} />
                <MiniStat label="Position" value={`P${session.position}/${session.totalDrivers}`} />
                <MiniStat label="Kart" value={`#${session.kartNumber}`} />
                <MiniStat label="Laps" value={String(session.laps.length)} />
            </div>

            {/* Lap time chart */}
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D1D9E0" opacity={0.4} />
                        <XAxis
                            dataKey="lap"
                            tick={{ fill: '#5F6B7C', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                            label={{ value: 'LAP', position: 'insideBottomRight', offset: -5, style: { fill: '#5F6B7C', fontSize: 9, fontFamily: 'monospace' } }}
                        />
                        <YAxis
                            domain={['dataMin - 1', 'dataMax + 1']}
                            tick={{ fill: '#5F6B7C', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                            width={45}
                            tickFormatter={(v: number) => formatTime(v)}
                        />
                        <ReferenceLine
                            y={bestLapTime}
                            stroke="#037f4c"
                            strokeDasharray="4 4"
                            strokeWidth={1}
                        />
                        <ReferenceLine
                            y={avgLapTime}
                            stroke="#5F6B7C"
                            strokeDasharray="2 2"
                            strokeWidth={1}
                        />
                        <Tooltip
                            content={({ active, payload }: any) => {
                                if (!active || !payload?.length) return null;
                                const d = payload[0].payload;
                                const delta = d.time - bestLapTime;
                                return (
                                    <div className="bg-hud-dark border border-hud-border p-2.5 shadow-sm">
                                        <p className="font-mono text-xs text-hud-muted mb-1">Lap {d.lap}</p>
                                        <p className="font-mono text-sm font-bold text-hud-accent">{d.label}</p>
                                        {delta > 0 && (
                                            <p className="font-mono text-[10px] text-hud-warning mt-0.5">
                                                +{delta.toFixed(3)}s vs best
                                            </p>
                                        )}
                                        {delta === 0 && (
                                            <p className="font-mono text-[10px] text-hud-success mt-0.5">
                                                BEST LAP
                                            </p>
                                        )}
                                    </div>
                                );
                            }}
                            cursor={{ stroke: '#D1D9E0', strokeWidth: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="time"
                            stroke="#0052CC"
                            strokeWidth={2}
                            dot={(props: any) => {
                                const { cx, cy, payload } = props;
                                const isBest = payload.time === bestLapTime;
                                return (
                                    <circle
                                        key={props.index}
                                        cx={cx}
                                        cy={cy}
                                        r={isBest ? 5 : 3}
                                        fill={isBest ? '#037f4c' : '#0052CC'}
                                        stroke="#FFFFFF"
                                        strokeWidth={2}
                                    />
                                );
                            }}
                            activeDot={{ r: 6, strokeWidth: 2, stroke: '#1C2127', fill: '#0052CC' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-4 mt-2 justify-center">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-hud-success" />
                    Best Lap
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                    <span className="w-4 border-t border-dashed" style={{ borderColor: '#5F6B7C' }} />
                    Avg Lap
                </span>
            </div>

            {/* Lap table */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs font-mono">
                    <thead>
                        <tr className="border-b border-hud-border text-[10px] uppercase tracking-widest text-hud-muted">
                            <th className="text-left py-1.5 pr-3">Lap</th>
                            <th className="text-right py-1.5 pr-3">Time</th>
                            <th className="text-right py-1.5">Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {session.laps.map((lap, i) => {
                            const t = parseTime(lap);
                            const delta = t - bestLapTime;
                            const isBest = delta === 0;
                            return (
                                <tr key={i} className="border-b border-hud-border/30 hover:bg-hud-gray/50 transition-colors">
                                    <td className="py-1.5 pr-3 text-hud-muted">{i + 1}</td>
                                    <td className={`py-1.5 pr-3 text-right font-bold ${isBest ? 'text-hud-success' : 'text-hud-text'}`}>
                                        {lap}
                                    </td>
                                    <td className={`py-1.5 text-right ${isBest ? 'text-hud-success' : 'text-hud-warning'}`}>
                                        {isBest ? 'BEST' : `+${delta.toFixed(3)}`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Sessions overview: compare across sessions ---
function SessionsView({ data }: { data: Session[] }) {
    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const chartData = sorted.map(s => ({
        label: `#${s.session}`,
        bestLap: parseTime(s.bestLap),
        avgLap: parseTime(s.lapAvg),
        session: s.session,
        date: s.date,
    }));

    return (
        <div>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D1D9E0" opacity={0.4} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#5F6B7C', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={['dataMin - 1', 'dataMax + 1']}
                            tick={{ fill: '#5F6B7C', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                            width={45}
                            tickFormatter={(v: number) => formatTime(v)}
                        />
                        <Tooltip
                            content={({ active, payload }: any) => {
                                if (!active || !payload?.length) return null;
                                const d = payload[0].payload;
                                return (
                                    <div className="bg-hud-dark border border-hud-border p-2.5 shadow-sm">
                                        <p className="font-mono text-xs text-hud-text font-bold mb-1">Session {d.label}</p>
                                        <p className="font-mono text-[10px] text-hud-muted mb-1.5">{formatDate(d.date)}</p>
                                        <p className="font-mono text-xs text-hud-accent">Best: {formatTime(d.bestLap)}</p>
                                        <p className="font-mono text-xs text-hud-muted">Avg: {formatTime(d.avgLap)}</p>
                                    </div>
                                );
                            }}
                        />
                        <Bar dataKey="bestLap" fill="#0052CC" radius={[2, 2, 0, 0]} name="Best" />
                        <Bar dataKey="avgLap" fill="#D1D9E0" radius={[2, 2, 0, 0]} name="Avg" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Session table */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs font-mono">
                    <thead>
                        <tr className="border-b border-hud-border text-[10px] uppercase tracking-widest text-hud-muted">
                            <th className="text-left py-1.5 pr-3">Session</th>
                            <th className="text-left py-1.5 pr-3">Date</th>
                            <th className="text-right py-1.5 pr-3">Best</th>
                            <th className="text-right py-1.5 pr-3">Avg</th>
                            <th className="text-right py-1.5 pr-3">Cons</th>
                            <th className="text-right py-1.5 pr-3">Pos</th>
                            <th className="text-right py-1.5">Kart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map(s => (
                            <tr key={s.session} className="border-b border-hud-border/30 hover:bg-hud-gray/50 transition-colors">
                                <td className="py-2 pr-3 text-hud-text font-bold">#{s.session}</td>
                                <td className="py-2 pr-3 text-hud-muted">{formatDate(s.date)} {s.time}</td>
                                <td className="py-2 pr-3 text-right text-hud-accent font-bold">{s.bestLap}</td>
                                <td className="py-2 pr-3 text-right text-hud-muted">{s.lapAvg}</td>
                                <td className="py-2 pr-3 text-right text-hud-text">{s.consistency.toFixed(3)}</td>
                                <td className="py-2 pr-3 text-right">
                                    <span className={s.position === 1 ? 'text-hud-success font-bold' : s.position <= 3 ? 'text-hud-warning' : 'text-hud-muted'}>
                                        P{s.position}
                                    </span>
                                    <span className="text-hud-muted">/{s.totalDrivers}</span>
                                </td>
                                <td className="py-2 text-right text-hud-muted">#{s.kartNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Consistency view ---
function ConsistencyView({ data }: { data: Session[] }) {
    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const chartData = sorted.map(s => ({
        label: `#${s.session}`,
        consistency: s.consistency,
        spread: parseTime(s.lapAvg) - parseTime(s.bestLap),
    }));

    return (
        <div>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D1D9E0" opacity={0.4} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#5F6B7C', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#5F6B7C', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                            width={35}
                            tickFormatter={(v: number) => `${v.toFixed(1)}s`}
                        />
                        <Tooltip
                            content={({ active, payload }: any) => {
                                if (!active || !payload?.length) return null;
                                const d = payload[0].payload;
                                return (
                                    <div className="bg-hud-dark border border-hud-border p-2.5 shadow-sm">
                                        <p className="font-mono text-xs text-hud-text font-bold mb-1">Session {d.label}</p>
                                        <p className="font-mono text-xs text-hud-accent">Cons: {d.consistency.toFixed(3)}</p>
                                        <p className="font-mono text-[10px] text-hud-muted">Best→Avg spread: {d.spread.toFixed(3)}s</p>
                                    </div>
                                );
                            }}
                        />
                        <Bar dataKey="consistency" fill="#0052CC" radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-[10px] font-mono text-hud-muted text-center mt-2 uppercase tracking-widest">
                Lower consistency score = more consistent laps
            </p>
        </div>
    );
}

// --- Stat helper ---
function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
    return (
        <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-hud-muted block mb-0.5">{label}</span>
            <span className={`text-sm font-bold font-mono ${accent ? 'text-hud-accent' : 'text-hud-text'}`}>{value}</span>
        </div>
    );
}

// --- Main ---
export default function KartingChart() {
    const [view, setView] = useState<ViewMode>('laps');

    const stats = useMemo(() => {
        const allBestTimes = kartingData.map(s => parseTime(s.bestLap));
        const overallBest = Math.min(...allBestTimes);
        const totalLaps = kartingData.reduce((a, s) => a + s.laps.length, 0);
        const wins = kartingData.filter(s => s.position === 1).length;
        const avgConsistency = kartingData.reduce((a, s) => a + s.consistency, 0) / kartingData.length;

        return {
            sessions: kartingData.length,
            totalLaps,
            overallBest: formatTime(overallBest),
            wins,
            avgConsistency: avgConsistency.toFixed(3),
            track: kartingData[0].track,
        };
    }, []);

    const views: { key: ViewMode; label: string }[] = [
        { key: 'laps', label: 'Lap Times' },
        { key: 'sessions', label: 'Sessions' },
        { key: 'consistency', label: 'Consistency' },
    ];

    return (
        <div className="space-y-6">
            {/* Aggregate Stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 border border-hud-border p-4 bg-hud-black/30">
                <MiniStat label="Sessions" value={String(stats.sessions)} />
                <MiniStat label="Total Laps" value={String(stats.totalLaps)} />
                <MiniStat label="Best Lap" value={stats.overallBest} accent />
                <MiniStat label="Wins" value={String(stats.wins)} />
                <MiniStat label="Avg Cons." value={stats.avgConsistency} />
                <MiniStat label="Track" value={stats.track} />
            </div>

            {/* View Switcher + Content */}
            <div className="border border-hud-border bg-hud-black/30 p-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-hud-text font-mono text-xs uppercase tracking-widest">
                        // TELEMETRY_DATA
                    </h3>
                    <div className="flex gap-1">
                        {views.map(v => (
                            <button
                                key={v.key}
                                onClick={() => setView(v.key)}
                                className={`
                                    px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all
                                    ${view === v.key
                                        ? 'bg-hud-accent text-white border-hud-accent'
                                        : 'bg-hud-black/50 text-hud-muted border-hud-border hover:border-hud-accent hover:text-hud-text'}
                                `}
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>
                </div>

                {view === 'laps' && <LapsView data={kartingData} />}
                {view === 'sessions' && <SessionsView data={kartingData} />}
                {view === 'consistency' && <ConsistencyView data={kartingData} />}
            </div>
        </div>
    );
}
