import React, { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import kartingData from '../data/karting.json';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-hud-black border border-hud-border p-3 shadow-lg max-w-[200px]">
                <p className="text-hud-text font-mono text-xs mb-1 border-b border-hud-border pb-1">{label}</p>
                <div className="space-y-1 mt-2">
                    <p className="text-hud-accent font-bold text-sm">
                        {data.bestLap}s <span className="text-[10px] font-normal text-hud-muted">Best Lap</span>
                    </p>
                    <p className="text-hud-text text-xs">
                        {data.laps} <span className="text-[10px] text-hud-muted">Laps</span>
                    </p>
                    <p className="text-hud-muted text-[10px] italic">
                        "{data.conditions}"
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

// Group data by track
const processData = (data: any[]) => {
    const tracks = [...new Set(data.map(d => d.track))];
    return { tracks, data };
};

export default function KartingChart() {
    const { tracks } = useMemo(() => processData(kartingData), []);

    return (
        <div className="w-full h-[350px] bg-hud-black/50 border border-hud-border/50 p-4 rounded-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-hud-text font-mono text-xs uppercase tracking-widest">
                    Telemetry // Lap_Pace_Evolution
                </h3>
                <div className="flex gap-4">
                    {tracks.map(track => (
                        <span key={track} className="text-[10px] font-mono text-hud-accent px-2 py-0.5 border border-hud-accent/30 rounded-full">
                            {track}
                        </span>
                    ))}
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kartingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorLap" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-hud-accent)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--color-hud-accent)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--color-hud-border)"
                        opacity={0.3}
                    />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'var(--color-hud-muted)', fontSize: 10, fontFamily: 'monospace' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => value.split('-').slice(0, 2).join('/')}
                        dy={10}
                    />
                    <YAxis
                        domain={['dataMin - 1', 'dataMax + 1']}
                        tick={{ fill: 'var(--color-hud-muted)', fontSize: 10, fontFamily: 'monospace' }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-hud-text)', strokeWidth: 1 }} />
                    <Area
                        type="monotone"
                        dataKey="bestLap"
                        stroke="var(--color-hud-accent)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorLap)"
                        activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--color-hud-text)' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
