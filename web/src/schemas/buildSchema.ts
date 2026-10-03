import * as z from 'zod';

export const buildSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    build_type_id: z.coerce
        .number()
        .int('Build type must be a whole number')
        .positive('Build type is required'),
    cpu: z.string().trim().min(1, 'CPU is required'),
    gpu: z.string().trim().min(1, 'GPU is required'),
    ram: z.string().trim().min(1, 'RAM is required'),
    storage: z.string().trim().min(1, 'Storage is required'),
    psu: z.string().trim().min(1, 'PSU is required'),
    mainboard: z.string().trim().min(1, 'Mainboard is required'),
    cpu_cooler: z.string().trim().min(1, 'CPU cooler is required'),
    case: z.string().trim().min(1, 'Case is required'),
    os: z.string().trim().min(1, 'OS is required'),

    sound_card: z.string().trim().nullable(),
    last_maintenance_at: z.string().trim().nullable(),
    last_maintenance_comment: z.string().trim().nullable(),
    next_maintenance_at: z.string().trim().nullable(),
    next_maintenance_comment: z.string().trim().nullable(),
});