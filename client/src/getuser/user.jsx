import React, { useEffect, useState } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([]);   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                console.log("User data fetched successfully:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8000/api/delete/user/${id}`)
        .then(response => {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Update the state to remove the deleted user
            toast.success(response.data.message, { position: "top-right" });
        })
        .catch(error => {
            console.log("Error while deleting user:", error);
        });     
    };

    return (
        <div className="userTable">
            <Link to="/adduser" type="button" className="btn btn-primary">
              Add User<i className="fa-solid fa-user-plus"></i>
            </Link>
               
            {users.length === 0 ? (
                <div className="noUsers">
                <h3>No users found.</h3>
                <p>Please add a user to see the list.</p>
              </div>
             ) : ( <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id || index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>   
                            <td className="actionButtons"> 
                                <Link to={`/updateuser/${user._id}`} type="button" className="btn btn-info">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>

                                <button 
                                onClick={() => deleteUser(user._id)}
                                type="button" className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
             
             
            
         </div>
    );
};

export default User;
