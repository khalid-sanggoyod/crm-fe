import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../../components/Modals/DeleteModal";
import AddProductModal from "../../components/Modals/AddModal/index";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
}

const TableSection: FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Fetch customer data
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/customers");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedCustomer(null);
  };

  const handleCloseAddModal = () => {
    setOpenModal(false);
    setSelectedCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenDeleteModal(true);
  };

  return (
    <section className="h-auto px-4 md:px-8 lg:px-20">
      <AddProductModal
        show={openModal}
        handleClose={handleCloseAddModal}
        // customer={selectedCustomer}
      />
      <DeleteModal
        show={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
        label={"Customer"}
        // customer={selectedCustomer}
      />

      <div className="space-y-8">
        <div className="panel-v1 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-xl md:text-2xl">Customer Lists</p>
            <button
              onClick={() => setOpenModal(true)}
              className="text-white px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-semibold">ID</th>
                  <th className="px-4 py-2 text-left font-semibold">First Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Last Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Email</th>
                  <th className="px-4 py-2 text-left font-semibold">Contact Number</th>
                  <th className="px-4 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{customer.id}</td>
                      <td className="px-4 py-2">{customer.first_name}</td>
                      <td className="px-4 py-2">{customer.last_name}</td>
                      <td className="px-4 py-2">{customer.email}</td>
                      <td className="px-4 py-2">{customer.contact_number}</td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-white px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer)}
                            className="text-white px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-2 text-center" colSpan={6}>
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSection;
