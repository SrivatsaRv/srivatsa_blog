import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
    slug: string;
    classification?: string;
}

interface FilterHubProps {
    posts: Post[];
}

export default function FilterHub({ posts }: FilterHubProps) {
    const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
    const [selectedTag, setSelectedTag] = useState<string>('ALL');

    // Extract unique years and tags
    const years = useMemo(() => {
        const y = new Set(posts.map(p => new Date(p.pubDate).getFullYear()));
        return Array.from(y).sort((a, b) => b - a);
    }, [posts]);

    const tags = useMemo(() => {
        const t = new Set(posts.flatMap(p => p.tags));
        return Array.from(t).sort();
    }, [posts]);

    // Filter Logic
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const postYear = new Date(post.pubDate).getFullYear();
            const yearMatch = selectedYear === 'ALL' || postYear === selectedYear;
            const tagMatch = selectedTag === 'ALL' || post.tags.includes(selectedTag);
            return yearMatch && tagMatch;
        });
    }, [posts, selectedYear, selectedTag]);

    return (
        <div className="space-y-8">
            {/* HUD Controls */}
            <div className="border-b border-hud-border pb-6 space-y-6">

                {/* Mobile: Horizontal Time Scroll / Desktop: Toolbar */}
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-hud-muted mb-2">
                        // TEMPORAL_SEQUENCE
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar md:flex-wrap">
                        <button
                            onClick={() => setSelectedYear('ALL')}
                            className={`
                                flex-shrink-0 px-4 py-1.5 text-xs font-mono font-bold border transition-all uppercase tracking-wider
                                ${selectedYear === 'ALL'
                                    ? 'bg-hud-accent text-white border-hud-accent'
                                    : 'bg-hud-black/50 text-hud-muted border-hud-border hover:border-hud-accent hover:text-hud-text'}
                            `}
                        >
                            ALL YEARS
                        </button>
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`
                                    flex-shrink-0 px-4 py-1.5 text-xs font-mono font-bold border transition-all
                                    ${selectedYear === year
                                        ? 'bg-hud-accent text-white border-hud-accent'
                                        : 'bg-hud-black/50 text-hud-muted border-hud-border hover:border-hud-accent hover:text-hud-text'}
                                `}
                            >
                                [{year}]
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-hud-muted mb-2">
                        // SYSTEM_TAGS
                    </span>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag('ALL')}
                            className={`
                                px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all
                                ${selectedTag === 'ALL'
                                    ? 'bg-hud-text text-white border-hud-text'
                                    : 'bg-hud-black/50 text-hud-muted border-hud-border hover:border-hud-text hover:text-hud-text'}
                            `}
                        >
                            ALL SYSTEMS
                        </button>
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag === selectedTag ? 'ALL' : tag)}
                                className={`
                                    px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all
                                    ${selectedTag === tag
                                        ? 'bg-hud-text text-white border-hud-text'
                                        : 'bg-hud-black/50 text-hud-muted border-hud-border hover:border-hud-text hover:text-hud-text'}
                                `}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Output */}
            <div className="min-h-[50vh]">
                <AnimatePresence mode='popLayout'>
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mb-6 group"
                        >
                            <a href={`/blog/${post.slug}/`} className="block p-6 border border-hud-border bg-hud-dark hover:border-hud-accent transition-all duration-300 relative overflow-hidden group-hover:shadow-sm">
                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-hud-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="relative z-10 flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-hud-muted">
                                        <span>{new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()}</span>
                                        <span className={`px-2 py-0.5 border ${post.classification === 'RESTRICTED' ? 'border-hud-warning text-hud-warning' : 'border-hud-border'}`}>
                                            {post.classification || 'UNCLASSIFIED'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold font-mono text-hud-text group-hover:text-hud-accent transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-hud-muted line-clamp-2 font-sans">
                                        {post.description}
                                    </p>

                                    <div className="flex gap-2 mt-2">
                                        {post.tags.map(t => (
                                            <span key={t} className="text-[10px] font-mono text-hud-accent uppercase tracking-wider">
                                                #{t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center border border-dashed border-hud-border"
                    >
                        <p className="font-mono text-hud-muted uppercase tracking-widest">
                            // ERROR: NO_LOGS_MATCH_CRITERIA
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
