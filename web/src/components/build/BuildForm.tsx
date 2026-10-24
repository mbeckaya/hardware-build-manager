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

                cpu_name: fieldErrors.cpu_name?.[0],
                cpu_service_at: fieldErrors.cpu_service_at?.[0],

                gpu_name: fieldErrors.gpu_name?.[0],
                gpu_service_at: fieldErrors.gpu_service_at?.[0],

                ram_name: fieldErrors.ram_name?.[0],
                ram_service_at: fieldErrors.ram_service_at?.[0],

                storage_name: fieldErrors.storage_name?.[0],
                storage_service_at: fieldErrors.storage_service_at?.[0],

                psu_name: fieldErrors.psu_name?.[0],
                psu_service_at: fieldErrors.psu_service_at?.[0],

                mainboard_name: fieldErrors.mainboard_name?.[0],
                mainboard_service_at: fieldErrors.mainboard_service_at?.[0],

                cpu_cooler_name: fieldErrors.cpu_cooler_name?.[0],
                cpu_cooler_service_at: fieldErrors.cpu_service_at?.[0],

                case_name: fieldErrors.case_name?.[0],
                case_service_at: fieldErrors.case_service_at?.[0],

                os_name: fieldErrors.os_name?.[0],
                os_service_at: fieldErrors.os_service_at?.[0],

                sound_card_name: fieldErrors.sound_card_name?.[0],

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
            <div className="flex w-full gap-4">
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
            </div>

            {/* CPU */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="cpu_name"
                    label="CPU*"
                    error={formErrors?.cpu_name}
                >
                    <input
                        id="cpu_name"
                        name="cpu_name"
                        type="text"
                        value={formData.cpu_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="cpu_service_at"
                    label="CPU Since*"
                    error={formErrors?.cpu_service_at}
                >
                    <input
                        id="cpu_service_at"
                        name="cpu_service_at"
                        type="date"
                        value={formData.cpu_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* GPU */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="gpu_name"
                    label="GPU*"
                    error={formErrors?.gpu_name}
                >
                    <input
                        id="gpu_name"
                        name="gpu_name"
                        type="text"
                        value={formData.gpu_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="gpu_service_at"
                    label="GPU Since*"
                    error={formErrors?.gpu_service_at}
                >
                    <input
                        id="gpu_service_at"
                        name="gpu_service_at"
                        type="date"
                        value={formData.gpu_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* RAM */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="ram_name"
                    label="RAM*"
                    error={formErrors?.ram_name}
                >
                    <input
                        id="ram_name"
                        name="ram_name"
                        type="text"
                        value={formData.ram_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="ram_service_at"
                    label="RAM Since*"
                    error={formErrors?.ram_service_at}
                >
                    <input
                        id="ram_service_at"
                        name="ram_service_at"
                        type="date"
                        value={formData.ram_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* Storage */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="storage_name"
                    label="Storage*"
                    error={formErrors?.storage_name}
                >
                    <input
                        id="storage_name"
                        name="storage_name"
                        type="text"
                        value={formData.storage_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="storage_service_at"
                    label="Storage Since*"
                    error={formErrors?.storage_service_at}
                >
                    <input
                        id="storage_service_at"
                        name="storage_service_at"
                        type="date"
                        value={formData.storage_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* PSU */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="psu_name"
                    label="PSU*"
                    error={formErrors?.psu_name}
                >
                    <input
                        id="psu_name"
                        name="psu_name"
                        type="text"
                        value={formData.psu_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="psu_service_at"
                    label="PSU Since*"
                    error={formErrors?.psu_service_at}
                >
                    <input
                        id="psu_service_at"
                        name="psu_service_at"
                        type="date"
                        value={formData.psu_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* Mainboard */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="mainboard_name"
                    label="Mainboard*"
                    error={formErrors?.mainboard_name}
                >
                    <input
                        id="mainboard_name"
                        name="mainboard_name"
                        type="text"
                        value={formData.mainboard_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="mainboard_service_at"
                    label="Mainboard Since*"
                    error={formErrors?.psu_service_at}
                >
                    <input
                        id="mainboard_service_at"
                        name="mainboard_service_at"
                        type="date"
                        value={formData.mainboard_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* CPU Cooler */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="cpu_cooler_name"
                    label="CPU Cooler*"
                    error={formErrors?.cpu_cooler_name}
                >
                    <input
                        id="cpu_cooler_name"
                        name="cpu_cooler_name"
                        type="text"
                        value={formData.cpu_cooler_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="cpu_cooler_service_at"
                    label="CPU Cooler Since*"
                    error={formErrors?.cpu_cooler_service_at}
                >
                    <input
                        id="cpu_cooler_service_at"
                        name="cpu_cooler_service_at"
                        type="date"
                        value={formData.cpu_cooler_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* Case */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="case_name"
                    label="Case*"
                    error={formErrors?.case_name}
                >
                    <input
                        id="case_name"
                        name="case_name"
                        type="text"
                        value={formData.case_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="case_service_at"
                    label="Case Since*"
                    error={formErrors?.case_service_at}
                >
                    <input
                        id="case_service_at"
                        name="case_service_at"
                        type="date"
                        value={formData.case_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* OS */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="os_name"
                    label="Operating System*"
                    error={formErrors?.os_name}
                >
                    <input
                        id="os_name"
                        name="os_name"
                        type="text"
                        value={formData.os_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="os_service_at"
                    label="Operating System Since*"
                    error={formErrors?.os_service_at}
                >
                    <input
                        id="os_service_at"
                        name="os_service_at"
                        type="date"
                        value={formData.os_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* Sound Card */}
            <div className="flex w-full gap-4">
                <FormInputRow
                    id="sound_card_name"
                    label="Sound Card"
                    error={formErrors?.sound_card_name}
                >
                    <input
                        id="sound_card_name"
                        name="sound_card_name"
                        type="text"
                        value={formData.sound_card_name ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
                <FormInputRow
                    id="sound_card_service_at"
                    label="Sound Card Since*"
                    error={formErrors?.sound_card_service_at}
                >
                    <input
                        id="sound_card_service_at"
                        name="sound_card_service_at"
                        type="date"
                        value={formData.sound_card_service_at ?? ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </FormInputRow>
            </div>

            {/* Last Maintenance */}
            <div className="flex w-full gap-4">
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
            </div>

            {/* Next Maintenance */}
            <div className="flex w-full gap-4">
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
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
}
