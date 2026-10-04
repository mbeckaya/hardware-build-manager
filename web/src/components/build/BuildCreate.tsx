import { useState } from 'react';
import { useNavigate } from 'react-router';

import { getApiErrorMessage } from '../../api/apiError';
import { useCreateBuildMutation } from '../../api/buildsApi';
import type { Build } from '../../types/build';

import BuildForm from './BuildForm';
import AlertMessage from '../AlertMessage';

export default function BuildCreate() {
    const [createError, setCreatError] = useState<string | null>(null);
    const [createBuild] = useCreateBuildMutation();
    const navigate = useNavigate();

    const build: Build = {
        id: -1,
        name: '',
        build_type_id: 1,

        cpu_name: '',
        cpu_service_at: '',

        gpu_name: '',
        gpu_service_at: '',

        ram_name: '',
        ram_service_at: '',

        storage_name: '',
        storage_service_at: '',

        psu_name: '',
        psu_service_at: '',

        mainboard_name: '',
        mainboard_service_at: '',

        cpu_cooler_name: '',
        cpu_cooler_service_at: '',

        case_name: '',
        case_service_at: '',

        os_name: '',
        os_service_at: '',

        sound_card_name: '',
        sound_card_service_at: '',

        last_maintenance_at: '',
        last_maintenance_comment: '',
        next_maintenance_at: '',
        next_maintenance_comment: '',
        created_at: '',
    };

    const onSubmitSuccess = async (build: Build) => {
        try {
            setCreatError(null);

            const { id, created_at, ...payload } = {
                ...build,
                sound_card_name: build.sound_card_name || null,
                last_maintenance_at: build.last_maintenance_at || null,
                last_maintenance_comment:
                    build.last_maintenance_comment || null,
                next_maintenance_at: build.next_maintenance_at || null,
                next_maintenance_comment:
                    build.next_maintenance_comment || null,
            };

            await createBuild(payload).unwrap();
        } catch (error) {
            setCreatError(
                getApiErrorMessage(error, 'The build could not be created.'),
            );
        }

        navigate('/');
    };

    if (createError) {
        return <AlertMessage type="error">{createError}</AlertMessage>;
    }

    return <BuildForm data={build} onSubmitSuccess={onSubmitSuccess} />;
}
