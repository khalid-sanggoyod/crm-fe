import React, { useEffect } from "react";
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

interface UpdateModalProps {
    show: boolean;
    handleClose: () => void;
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
    selectedCustomer: Customer | null;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    show,
    handleClose,
    setCustomers,
    selectedCustomer,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Customer>();

    // Prefill form with selected customer data
    useEffect(() => {
        if (selectedCustomer) {
            setValue("first_name", selectedCustomer.first_name);
            setValue("last_name", selectedCustomer.last_name);
            setValue("email", selectedCustomer.email);
            setValue("contact_number", selectedCustomer.contact_number);
        }
    }, [selectedCustomer, setValue]);

    const handleCloseAndReset = () => {
        handleClose();
        reset();
    };

    const onSubmit = async (data: Customer) => {
        if (!selectedCustomer) return;
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/customers/${selectedCustomer.id}`, data);

            if (response.status === 201) {
                setCustomers((prev) =>
                    prev.map((customer) =>
                        customer.id === selectedCustomer.id ? response.data.data : customer
                    )
                );
                handleCloseAndReset();
                alert("Customer updated successfully!");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("Failed to update customer. Please try again.");
        }
    };

    if (!show) return null;

    return (
        <Modal
            show={show}
            handleCloseAndReset={handleCloseAndReset}
            label="Update Customer"
            handleSubmit={handleSubmit(onSubmit)}
        >
            <div className="block h-full p-4 my-auto space-y-4">
                <InputComponent
                    label={"First Name"}
                    register={register("first_name", {
                        required: "First name is required",
                    })}
                    errors={errors.first_name?.message}
                    notRequired={true}
                />

                <InputComponent
                    label={"Last Name"}
                    register={register("last_name", {
                        required: "Last name is required",
                    })}
                    errors={errors.last_name?.message}
                    notRequired={true}
                />

                <InputComponent
                    label={"Email"}
                    register={register("email", {
                        required: "Email is required",
                    })}
                    errors={errors.email?.message}
                    notRequired={true}
                />

                <InputComponent
                    label={"Contact Number"}
                    register={register("contact_number", {
                        required: "Contact Number is required",
                    })}
                    errors={errors.contact_number?.message}
                    notRequired={true}
                />
            </div>
        </Modal>
    );
};

export default React.memo(UpdateModal);
