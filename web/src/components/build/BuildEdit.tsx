import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
    useGetBuildByIdQuery,
    useUpdateBuildMutation,
} from '../../api/buildsApi';
import { getApiErrorMessage } from '../../api/apiError';
import type { Build } from '../../types/build';

import BuildForm from './BuildForm';
import LoadingSpinner from '../LoadingSpinner';
import AlertMessage from '../AlertMessage';

type Props = {
    id: string;
};

export default function BuildEdit({ id }: Props) {
    const { data: build, isLoading, error } = useGetBuildByIdQuery(id);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateBuild] = useUpdateBuildMutation();
    const navigate = useNavigate();

    const onSubmitSuccess = async (build: Build) => {
        try {
            setUpdateError(null);

            await updateBuild({
                id: Number(id),
                build,
            }).unwrap();
        } catch (error) {
            setUpdateError(
                getApiErrorMessage(error, 'The build could not be updated.'),
            );
        }

        navigate('/');
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || updateError) {
        return (
            <AlertMessage type="error">
                {error && <>Loading Build</>}
                {updateError && <>{updateError}</>}
            </AlertMessage>
        );
    }

    if (!build) {
        return <p>No build</p>;
    }

    return <BuildForm data={build} onSubmitSuccess={onSubmitSuccess} />;
}
