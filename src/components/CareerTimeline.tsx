import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TECH_TIMELINE, type TimelineEvent } from '../data/career';

export default function CareerTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    // For Horizontal Scroll (Desktop)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div className="py-20 relative overflow-hidden">
            <div className="mb-12 border-b border-hud-border pb-4">
                <h2 className="text-xl font-mono font-bold text-hud-text uppercase tracking-widest">
                    // ORIGIN_SEQUENCE
                </h2>
                <p className="text-xs font-mono text-hud-muted mt-2">
                    Systems. Virtualization. Cloud.
                </p>
            </div>

            {/* Desktop: Horizontal Line */}
            <div className="hidden md:flex gap-12 relative">
                {/* Connecting Line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-hud-border z-0" />

                {TECH_TIMELINE.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative z-10 flex flex-col items-center text-center w-64 flex-shrink-0"
                    >
                        <div className={`
                            w-16 h-16 rounded-full border-2 bg-hud-black flex items-center justify-center mb-6
                            ${getCategoryColor(item.category)}
                        `}>
                            <span className="font-mono font-bold text-sm">{item.year}</span>
                        </div>
                        <h3 className="font-mono font-bold text-hud-text text-lg mb-2">{item.title}</h3>
                        <p className="text-xs text-hud-muted font-sans leading-relaxed">{item.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Mobile: Vertical Stack */}
            <div className="md:hidden flex flex-col gap-12 relative pl-8 border-l border-hud-border ml-4">
                {TECH_TIMELINE.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className={`
                            absolute -left-[41px] top-0 w-10 h-10 rounded-full border-2 bg-hud-black flex items-center justify-center
                            ${getCategoryColor(item.category)}
                        `}>
                            <span className="font-mono font-bold text-[10px]">{item.year}</span>
                        </div>

                        <div className="pl-4">
                            <h3 className="font-mono font-bold text-hud-text text-base mb-1">{item.title}</h3>
                            <p className="text-sm text-hud-muted font-sans">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function getCategoryColor(category: TimelineEvent['category']) {
    switch (category) {
        case 'systems': return 'border-hud-border text-hud-muted';
        case 'virtualization': return 'border-hud-accent text-hud-accent';
        case 'infrastructure': return 'border-hud-warning text-hud-warning';
        case 'cloud': return 'border-hud-success text-hud-success';
        default: return 'border-hud-border';
    }
}
