const Users = ({ users, openModal, openDeleteModal }) => {
  return (
    <div>
      {users.length > 0 ? (
        <div
          className="pt-14 pl-14 grid grid-cols-1 gap-4"
          style={{
            width: "30vw",
            fontWeight: "700",
            fontHeight: "18px",
            fontSize: "21px",
          }}
        >
          <div className="pl-10">USERS:</div>
          {users.map((user) => (
            <div key={user.user_id} style={{ width: "40vw" }} className="pl-10">
              <div
                style={{
                  fontWeight: "600",
                  fontHeight: "18px",
                  fontSize: "21px",
                }}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="pt-4 py-1 mx-8">Name: {user.name}</div>
                <div className="py-1 mx-8">Age: {user.age}</div>
                <div className="py-1 mx-8">Email: {user.email}</div>
                <div className="py-1 mx-8">Mobile: {user.mobile_number}</div>
                <div className="py-1 mx-8">Address: {user.address}</div>
                <div className="mx-8 px-8 pt-5">
                  <button
                    onClick={() => openModal(user.user_id)}
                    className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => openDeleteModal(user.user_id)}
                    className="mt-5 ml-5 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="pt-14 grid grid-cols-1 gap-4 "
          style={{ width: "30vw" }}
        >
          <div
            style={{ width: "30vw" }}
            className="mt-6 py-10 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            There are no current users
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
