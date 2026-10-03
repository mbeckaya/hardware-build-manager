import { useState } from 'react';

import type { Build, BuildFormErrors } from '../../types/build';
import { buildSchema } from '../../schemas/buildSchema';
import { useGetAllBuildTypesQuery } from '../../api/buildTypesApi';

import FormInputRow from '../FormInputRow';

type Props = {
    data: Build;
    onSubmitSuccess: (build: Build) => void;
};

export default function BuildForm({ data, onSubmitSuccess }: Props) {
    const [formData, setFormData] = useState<Build>(data);
    const [formErrors, setFormErrors] = useState<BuildFormErrors>({});
    const { data: buildTypes = [] } = useGetAllBuildTypesQuery();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'id' || name === 'build_type_id'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = buildSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setFormErrors({
                name: fieldErrors.name?.[0],
                build_type_id: fieldErrors.build_type_id?.[0],
                cpu: fieldErrors.cpu?.[0],
                gpu: fieldErrors.gpu?.[0],
                ram: fieldErrors.ram?.[0],
                storage: fieldErrors.storage?.[0],
                psu: fieldErrors.psu?.[0],
                mainboard: fieldErrors.mainboard?.[0],
                cpu_cooler: fieldErrors.cpu_cooler?.[0],
                case: fieldErrors.case?.[0],
                os: fieldErrors.os?.[0],
                sound_card: fieldErrors.sound_card?.[0],
                last_maintenance_at: fieldErrors.last_maintenance_at?.[0],
                last_maintenance_comment:
                    fieldErrors.last_maintenance_comment?.[0],
                next_maintenance_at: fieldErrors.next_maintenance_at?.[0],
                next_maintenance_comment:
                    fieldErrors.next_maintenance_comment?.[0],
            });

            return;
        }

        setFormErrors({});
        onSubmitSuccess(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Name */}
            <FormInputRow id="name" label="Name*" error={formErrors?.name}>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Build-Typ (Select) */}
            <FormInputRow
                id="build_type_id"
                label="Build-Typ*"
                error={formErrors?.build_type_id}
            >
                <select
                    id="build_type_id"
                    name="build_type_id"
                    value={formData.build_type_id}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                >
                    <option value="" disabled>
                        -- Please choose --
                    </option>
                    {buildTypes.map((bt) => (
                        <option key={bt.id} value={bt.id}>
                            {bt.name}
                        </option>
                    ))}
                </select>
            </FormInputRow>

            <div className="divider">Hardware</div>

            {/* CPU */}
            <FormInputRow id="cpu" label="CPU*" error={formErrors?.cpu}>
                <input
                    id="cpu"
                    name="cpu"
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* GPU */}
            <FormInputRow id="gpu" label="GPU*" error={formErrors?.gpu}>
                <input
                    id="gpu"
                    name="gpu"
                    type="text"
                    value={formData.gpu}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* RAM */}
            <FormInputRow id="ram" label="RAM*" error={formErrors?.ram}>
                <input
                    id="ram"
                    name="ram"
                    type="text"
                    value={formData.ram}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Storage */}
            <FormInputRow
                id="storage"
                label="Storage*"
                error={formErrors?.storage}
            >
                <input
                    id="storage"
                    name="storage"
                    type="text"
                    value={formData.storage}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* PSU */}
            <FormInputRow
                id="psu"
                label="Power Supply*"
                error={formErrors?.psu}
            >
                <input
                    id="psu"
                    name="psu"
                    type="text"
                    value={formData.psu}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Mainboard */}
            <FormInputRow
                id="mainboard"
                label="Mainboard*"
                error={formErrors?.mainboard}
            >
                <input
                    id="mainboard"
                    name="mainboard"
                    type="text"
                    value={formData.mainboard}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* CPU Cooler */}
            <FormInputRow
                id="cpu_cooler"
                label="CPU Cooler*"
                error={formErrors?.cpu_cooler}
            >
                <input
                    id="cpu_cooler"
                    name="cpu_cooler"
                    type="text"
                    value={formData.cpu_cooler}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Case */}
            <FormInputRow id="case" label="Case*" error={formErrors?.case}>
                <input
                    id="case"
                    name="case"
                    type="text"
                    value={formData.case}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* OS */}
            <FormInputRow
                id="os"
                label="Operating System*"
                error={formErrors?.os}
            >
                <input
                    id="os"
                    name="os"
                    type="text"
                    value={formData.os}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Sound Card */}
            <FormInputRow
                id="sound_card"
                label="Sound Card"
                error={formErrors?.sound_card}
            >
                <input
                    id="sound_card"
                    name="sound_card"
                    type="text"
                    value={formData.sound_card ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            <div className="divider">Maintenance</div>

            {/* Last Maintenance */}
            <FormInputRow
                id="last_maintenance_at"
                label="Last Maintenance"
                error={formErrors?.last_maintenance_at}
            >
                <input
                    id="last_maintenance_at"
                    name="last_maintenance_at"
                    type="date"
                    value={formData.last_maintenance_at ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Last Maintenance Comment (Textarea) */}
            <FormInputRow
                id="last_maintenance_comment"
                label="Last Maintenance Comment"
                error={formErrors?.last_maintenance_comment}
            >
                <textarea
                    id="last_maintenance_comment"
                    name="last_maintenance_comment"
                    value={formData.last_maintenance_comment ?? ''}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                />
            </FormInputRow>

            {/* Next Maintenance */}
            <FormInputRow
                id="next_maintenance_at"
                label="Next Maintenance"
                error={formErrors?.next_maintenance_at}
            >
                <input
                    id="next_maintenance_at"
                    name="next_maintenance_at"
                    type="date"
                    value={formData.next_maintenance_at ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </FormInputRow>

            {/* Next Maintenance Comment (Textarea) */}
            <FormInputRow
                id="next_maintenance_comment"
                label="Next Maintenance Comment"
                error={formErrors?.next_maintenance_comment}
            >
                <textarea
                    id="next_maintenance_comment"
                    name="next_maintenance_comment"
                    value={formData.next_maintenance_comment ?? ''}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                />
            </FormInputRow>

            <div className="flex justify-end pt-4">
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
}
