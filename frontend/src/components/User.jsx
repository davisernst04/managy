const User = ({ user }) => {
  return (
    <div>
      <h3>
        {user.name}
      </h3>
      <p>{user.role}, {user.email}, {user.userid}</p>
    </div>
  )
}
export default User;

