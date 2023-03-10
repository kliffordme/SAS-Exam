import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Users from "./components/Users";
import CustomModal from "./components/CustomModal";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [editedUser, setEditedUser] = useState();
  const [openOptions, setOpenOptions] = useState(true);

  const getData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SAS_ALL_USERS_PATH}`,
      });

      if (!res) {
        return;
      }

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formHandler = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const clickButton = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SAS_POST_USER_PATH}`,
        data: formData,
      });

      setFormData({
        name: "",
        age: "",
        email: "",
        mobile_number: "",
        address: "",
      });
      getData();

      setOpenForm(!openForm);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (id) => {
    console.log(id);
    const data = users.filter((user) => user.user_id === id);
    console.log(data);
    setEditedUser(data);
    setOpenOptions(true);
    setOpenInput(true);
  };

  const openDeleteModal = (id) => {
    const data = users.filter((user) => user.user_id === id);
    setEditedUser(data);
    setOpenInput(true);
    setOpenOptions(false);
  };

  return (
    <div
      className="flex justify-center"
      style={{ width: "100vw", height: "100%" }}
    >
      {openForm ? (
        <div style={{ width: "35%" }} className="pt-16 pr-10">
          <form class="w-full max-w-lg" onSubmit={clickButton}>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div
                class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                style={{ width: "100%" }}
              >
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                  style={{
                    fontWeight: "700",
                    fontSize: "20px",
                    fontHeight: "18.5px",
                  }}
                >
                  Add User
                </label>
                <input
                  class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  onChange={(e) => formHandler("name", e.target.value)}
                  defaultValue={formData.name}
                  placeholder="Name"
                  required
                />
                <input
                  class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  onChange={(e) => formHandler("age", e.target.value)}
                  defaultValue={formData.age}
                  placeholder="Age"
                  required
                />
                <input
                  class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="email"
                  onChange={(e) => formHandler("email", e.target.value)}
                  defaultValue={formData.email}
                  placeholder="Email"
                  required
                />
                <input
                  class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  onChange={(e) => formHandler("mobile_number", e.target.value)}
                  defaultValue={formData.mobile_number}
                  placeholder="Mobile Number"
                  required
                />
                <input
                  class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  onChange={(e) => formHandler("address", e.target.value)}
                  defaultValue={formData.address}
                  placeholder="Address"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add User
                </button>
                <button
                  onClick={() => setOpenForm(!openForm)}
                  style={{
                    color: "rgb(63 131 248 / 0.5)",
                    border: "1px solid rgb(63 131 248 / 0.5)",
                  }}
                  className="ml-8 bg-white-500 hover:bg-gray-100 text-blue font-bold py-2 px-4 rounded"
                >
                  Close Form
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ width: "35%" }} className="pt-14">
          <div className="pb-5">
            <span
              style={{
                fontWeight: "700",
                fontSize: "24px",
                fontHeight: "18.5px",
              }}
            >
              Welcome! You can add user(s) here:
            </span>
          </div>
          <button
            onClick={() => setOpenForm(!openForm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>
      )}
      <Users
        users={users}
        openModal={openModal}
        openDeleteModal={openDeleteModal}
      />
      <CustomModal
        setOpenInput={setOpenInput}
        openInput={openInput}
        users={users}
        editedUser={editedUser}
        getData={getData}
        openOptions={openOptions}
        setOpenOptions={setOpenOptions}
      />
    </div>
  );
}

export default App;
