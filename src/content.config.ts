import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const puppies = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/puppies' }),
  schema: z.object({
    name: z.string(),
    sex: z.enum(['male', 'female']),
    color: z.string(),
    birthDate: z.string(),
    readyDate: z.string(),
    status: z.enum(['available', 'reserved', 'sold']).default('available'),
    price: z.number().default(1200),
    gallery: z.array(z.string()),
    video: z.string().optional(),
    note: z.string().max(280).optional(),
    vetExamDate: z.string().optional(),
    vaccinationDate: z.string().optional(),
    dewormingDate: z.string().optional(),
    healthCertificateAvailable: z.boolean().default(false),
    sire: z.string().optional(),
    dam: z.string().optional(),
  }),
});

const parents = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/parents' }),
  schema: z.object({
    name: z.string(),
    sex: z.enum(['male', 'female']),
    color: z.string().optional(),
    photo: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { puppies, parents };
