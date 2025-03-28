import { useState } from "react";
import axios from "axios";

const AddCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!companyName || !companyCode) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/create-company", {
        CompanyName: companyName,
        CompanyCode: companyCode.toUpperCase(), // Convert code to uppercase
      });

      setMessage(response.data.message);
      setCompanyName("");
      setCompanyCode("");
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Company</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Company Code (Max 5 letters)</label>
          <input
            type="text"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="E.g., PS001"
            maxLength="5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
