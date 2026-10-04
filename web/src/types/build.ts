export type Build = {
    id: number;
    name: string;
    build_type_id: number;

    cpu_name: string;
    cpu_service_at: string | null;

    gpu_name: string;
    gpu_service_at: string | null;

    ram_name: string;
    ram_service_at: string | null;

    storage_name: string;
    storage_service_at: string | null;

    psu_name: string;
    psu_service_at: string | null;

    mainboard_name: string;
    mainboard_service_at: string | null;

    cpu_cooler_name: string;
    cpu_cooler_service_at: string | null;

    case_name: string;
    case_service_at: string | null;

    os_name: string;
    os_service_at: string | null;

    sound_card_name: string | null;
    sound_card_service_at: string | null;

    last_maintenance_at: string | null;
    last_maintenance_comment: string | null;
    next_maintenance_at: string | null;
    next_maintenance_comment: string | null;
    created_at: string;
};

export type BuildWithMappedType = Build & {
    build_type: string | null;
};

export type BuildFormErrors = {
    name?: string;
    build_type_id?: string;
    
    cpu_name?: string;
    cpu_service_at?: string;
    
    gpu_name?: string;
    gpu_service_at?: string;
    
    ram_name?: string;
    ram_service_at?: string;
    
    storage_name?: string;
    storage_service_at?: string;
    
    psu_name?: string;
    psu_service_at?: string;
    
    mainboard_name?: string;
    mainboard_service_at?: string;
    
    cpu_cooler_name?: string;
    cpu_cooler_service_at?: string;
    
    case_name?: string;
    case_service_at?: string;
    
    os_name?: string;
    os_service_at?: string;
    
    sound_card_name?: string;
    sound_card_service_at?: string;

    last_maintenance_at?: string;
    last_maintenance_comment?: string;
    next_maintenance_at?: string;
    next_maintenance_comment?: string;
};
