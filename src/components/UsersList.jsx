import React from "react";

const UsersList = ({usersList, selectUser, deleteUser}) => {
  return (
    <ul className="card">
      <div className="card-header">
        <div className="div1">ID</div>
        <div className="div2">Name</div>
        <div className="div3">Email</div>
        <div className="div4">Password</div>
        <div className="div5">Birthday</div>
        <div className="div6">Actions</div>

      </div>
      {usersList.map((user) => (
        
        <li className="card-li" key={user.id}>
          <div>{user.id}</div>
          <div>{user.first_name + " " + user.last_name }</div>
          <div> {user.email}</div>
          <div> {user.password}</div>
          <div> {user.birthday}</div>
          <div className="btn"><button onClick={() => selectUser(user)}>Update</button> | <button onClick={() => deleteUser(user.id)}>Delete</button></div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
