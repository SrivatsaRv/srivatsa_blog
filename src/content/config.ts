import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        author: z.string().default('Srivatsa RV'),
        pubDate: z.date(),
        tags: z.array(z.string()),
        classification: z.string().optional().default('UNCLASSIFIED'),
    }),
});

export const collections = {
    'blog': blogCollection,
};
