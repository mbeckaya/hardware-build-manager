import * as z from 'zod';

export const buildSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    build_type_id: z.coerce
        .number()
        .int('Build type must be a whole number')
        .positive('Build type is required'),
    
    cpu_name: z.string().trim().min(1, 'CPU is required'),
    cpu_service_at: z.string().trim().min(1, 'CPU service is required'),

    gpu_name: z.string().trim().min(1, 'GPU is required'),
    gpu_service_at: z.string().trim().min(1, 'GPU service is required'),

    ram_name: z.string().trim().min(1, 'RAM is required'),
    ram_service_at: z.string().trim().min(1, 'RAM service is required'),

    storage_name: z.string().trim().min(1, 'Storage is required'),
    storage_service_at: z.string().trim().min(1, 'Storage service is required'),

    psu_name: z.string().trim().min(1, 'PSU is required'),
    psu_service_at: z.string().trim().min(1, 'PSU service is required'),

    mainboard_name: z.string().trim().min(1, 'Mainboard is required'),
    mainboard_service_at: z.string().trim().min(1, 'Mainboard service is required'),

    cpu_cooler_name: z.string().trim().min(1, 'CPU cooler is required'),
    cpu_cooler_service_at: z.string().trim().min(1, 'CPU cooler service is required'),

    case_name: z.string().trim().min(1, 'Case is required'),
    case_service_at: z.string().trim().min(1, 'Case service is required'),

    os_name: z.string().trim().min(1, 'OS is required'),
    os_service_at: z.string().trim().min(1, 'OS service is required'),

    sound_card_name: z.string().trim().nullable(),
    last_maintenance_at: z.string().trim().nullable(),
    last_maintenance_comment: z.string().trim().nullable(),
    next_maintenance_at: z.string().trim().nullable(),
    next_maintenance_comment: z.string().trim().nullable(),
});
