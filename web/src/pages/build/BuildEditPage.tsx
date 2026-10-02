import { useParams } from 'react-router';

import Headline from '../../components/Headline';
import BuildEdit from '../../components/build/BuildEdit';

export default function BuildEditPage() {
    const { id } = useParams();

    if (!id) return;

    return (
        <>
            <Headline>Build Edit</Headline>

            <BuildEdit id={id} />
        </>
    );
}
