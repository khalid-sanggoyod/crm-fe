import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from ".";
import { InputComponent } from "../Input";

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
}

interface AddModalProps {
    show: boolean;
    handleClose: () => void;
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const AddModal: React.FC<AddModalProps> = ({ show, handleClose, setCustomers }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Customer>();

    const handleCloseAndReset = () => {
        handleClose()
        reset()
    }

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/customers",
                data
            );

            if (response.status === 201) {
                setCustomers((prev: any) => [...prev, response.data.data]);
                handleClose()
                reset()
                alert("Form submitted successfully!");
            }
        } catch (error: any) {
            console.log("Error submitting form: ", error);
            alert("Error submitting form!")
        }
    }

    return (
        <Modal
            show={show}
            handleCloseAndReset={handleCloseAndReset}
            label={'Add New Customer'}
            handleSubmit={handleSubmit(onSubmit)}
        >
            <div className="block h-full p-4 my-auto space-y-4">
                <InputComponent
                    label={"First Name"}
                    register={register("first_name", {
                        required: "First name is required",
                    })}
                    errors={errors.first_name?.message}
                />

                <InputComponent
                    label={"Last Name"}
                    register={register("last_name", {
                        required: "Last name is required",
                    })}
                    errors={errors.last_name?.message}
                />

                <InputComponent
                    label={"Email"}
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
                    })}
                    errors={errors.email?.message}
                />

                <InputComponent
                    label={"Contact Number"}
                    register={register("contact_number", {
                        required: "Contact Number is required",
                    })}
                    errors={errors.contact_number?.message}
                />
            </div>
        </Modal>
    )
}

export default React.memo(AddModal)