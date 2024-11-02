const User = ({ user }) => {
  return (
    <div className="border border-black rounded m-4 shadow-xl bg-white">
      <h1 className="font-bold p-1">
        {user.first_name} {user.last_name}
      </h1>
      <p className="p-1">User Role: {user.role}</p>
      <p className="p-1">User Email: {user.email} </p>
      <p className="p-1">User ID: {user.id}</p>
    </div>
  )
}
export default User;

