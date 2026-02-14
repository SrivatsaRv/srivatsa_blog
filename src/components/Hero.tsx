import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|[]{}<>";

const DecodingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [display, setDisplay] = useState('');
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            if (Date.now() < startTime) return;

            setDisplay(prev => {
                return text
                    .split("")
                    .map((char: string, index: number) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");
            });

            if (iteration >= text.length) {
                clearInterval(interval);
                setComplete(true);
            }

            iteration += 1 / 3;
        }, 30);

        const startTime = Date.now() + delay;

        return () => clearInterval(interval);
    }, [text, delay]);

    return (
        <span className={complete ? "text-hud-text" : "text-hud-accent/70"}>
            {display}
        </span>
    );
};

export default function Hero() {
    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Dynamic Background Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-hud-accent/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hud-warning/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </motion.div>

            <div className="z-10 text-center space-y-6 md:space-y-8 px-4 w-full max-w-[100vw] overflow-hidden">
                {/* Main Identity */}
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-medium font-mono tracking-tight leading-none text-hud-text break-words">
                    <DecodingText text="srivatsa.rv" delay={200} />
                </h1>

                {/* Sub-Identity / Role */}
                <div className="flex flex-col md:flex-row items-center gap-4 justify-center text-sm md:text-base font-mono text-hud-muted tracking-widest uppercase">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="flex items-center gap-2"
                    >
                        <span className="w-2 h-2 bg-hud-success rounded-full animate-pulse" />
                        <span>Operational</span>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7 }}
                        className="hidden md:inline text-hud-border"
                    >
            //
                    </motion.span>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.9 }}
                    >
                        Engineering Systems
                    </motion.div>
                </div>

                {/* System Access CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-3 pt-4 w-full px-4 z-20"
                >
                    <a href="/blog" className="group relative px-6 py-2 bg-hud-black border border-hud-border hover:border-hud-accent transition-all duration-300 overflow-hidden w-auto text-center min-w-[140px]">
                        <div className="absolute inset-0 bg-hud-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative font-mono text-xs font-bold text-hud-text group-hover:text-hud-accent uppercase tracking-widest">
                            Mission Logs
                        </span>
                    </a>

                    <a href="/hobbies" className="group relative px-6 py-2 bg-hud-black border border-hud-border hover:border-hud-accent transition-all duration-300 overflow-hidden w-auto text-center min-w-[140px]">
                        <div className="absolute inset-0 bg-hud-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative font-mono text-xs font-bold text-hud-text group-hover:text-hud-accent uppercase tracking-widest">
                            Stuff I Do
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Footer Status Line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 w-full px-8 flex justify-between items-end text-[10px] font-mono text-hud-muted uppercase tracking-widest pointer-events-none"
            >
                <span>System: Online</span>
                <span>V.2.0.26</span>
            </motion.div>
        </div>
    );
}
