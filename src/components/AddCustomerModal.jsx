import { useState } from 'react';
import { createCustomer } from '../services/customersService';

function AddCustomerModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCustomer(formData)
            alert("Customer created!")
            console.log("Customer added: ", formData)
            setIsOpen(false);
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                streetaddress: "",
                postcode: "",
                city: "",
            });
        } catch (error) {
            console.error("Error creating a customer: ", error)
            alert("Failed to create customer")
        }
    };

      return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Add Customer
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="text"
                name="streetaddress"
                placeholder="Street Address"
                value={formData.streetaddress}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCustomerModal;