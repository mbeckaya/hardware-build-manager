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
        cpu: '',
        gpu: '',
        ram: '',
        storage: '',
        psu: '',
        mainboard: '',
        cpu_cooler: '',
        case: '',
        os: '',
        sound_card: '',
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
                sound_card: build.sound_card || null,
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
