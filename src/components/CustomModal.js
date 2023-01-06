import React, { useMemo, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CustomModal = ({
  setOpenInput,
  openInput,
  editedUser,
  getData,
  openOptions,
}) => {
  const [formData, setFormData] = useState({});

  useMemo(() => {
    if (editedUser) {
      setFormData({
        name: editedUser[0]?.name,
        age: editedUser[0]?.age,
        email: editedUser[0]?.email,
        mobile_number: editedUser[0]?.mobile_number,
        address: editedUser[0]?.address,
      });
    }
  }, [editedUser]);

  const formHandler = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_SAS_UPDATE_USER_PATH}/${editedUser[0]?.user_id}`,
        data: formData,
      });
      console.log(res);

      setFormData({
        name: "",
        age: "",
        email: "",
        mobile_number: "",
        address: "",
      });

      setOpenInput(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    console.log(editedUser[0].user_id);
    try {
      const res = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SAS_DELETE_USER_PATH}/${editedUser[0]?.user_id}`,
        data: formData,
      });
      console.log(res);

      setOpenInput(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={openInput}
        onRequestClose={() => setOpenInput(false)}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {openOptions ? (
          <form
            class="w-full max-w-lg"
            onSubmit={onSubmit}
            style={{ width: "30vw", height: "50vh" }}
          >
            <div>
              <div class="w-full  px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Edit User
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
                  className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit User
                </button>
                <button
                  onClick={() => setOpenInput(false)}
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
        ) : (
          <div style={{ width: "30vw", height: "20vh" }}>
            <div className="flex justify-center pt-10">
              Are you sure you want to delete this user?
            </div>
            <div className="flex justify-center">
              <div>
                <button
                  onClick={() => setOpenInput(false)}
                  className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
                >
                  NO
                </button>
              </div>
              <div>
                <button
                  onClick={() => onDelete()}
                  className="mt-5 ml-5 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomModal;
