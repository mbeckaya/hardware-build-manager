export type Build = {
    id: number;
    name: string;
    build_type_id: number;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    psu: string;
    mainboard: string;
    cpu_cooler: string;
    case: string;
    os: string;

    sound_card: string | null;
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
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    psu?: string;
    mainboard?: string;
    cpu_cooler?: string;
    case?: string;
    os?: string;
    sound_card?: string;
    last_maintenance_at?: string;
    last_maintenance_comment?: string;
    next_maintenance_at?: string;
    next_maintenance_comment?: string;
};