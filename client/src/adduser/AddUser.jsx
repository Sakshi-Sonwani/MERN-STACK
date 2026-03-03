import React from "react";
import "./adduser.css"; 
import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    };
    const [user, setuser] = React.useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log("Input changed:", name, value);

        setuser({ ...user, [name]: value });
    };
       
       const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
        .then(response => {
            toast.success(response.data.message, { position: "top-right" });
            navigate("/users"); // Redirect to the user list page after successful submission
        })
        .catch(error => {
            console.error("Error adding user:", error);
        });
        console.log("Form submitted with data:", user);
        // Here you can add code to send 'user' data to your backend API
    };

  return (
    <div className="adduser">
        <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
        </Link>

      <h3>Add New User</h3>
        <Form className="adduserForm" onSubmit={submitForm}>
            <div className="inputgroup">
               <label htmlFor="name">Name:</label>
               <input 
               type="text" 
               id="name"
               onChange={inputHandler}
               name="name"
               autoComplete="off"
               placeholder="Enter your name" /> 
            </div>
             <div className="inputgroup">
               <label htmlFor="email">Email:</label>
               <input 
               type="email" 
               id="email"
               onChange={inputHandler}
               name="email"
               autoComplete="off"
               placeholder="Enter your email" /> 
            </div>
                <div className="inputgroup">    
                <label htmlFor="address">Address:</label>
                <input  
                type="text"
                id="address"
                onChange={inputHandler}
                name="address"
                autoComplete="off"
                placeholder="Enter your address" /> 
            </div>
            <button type="submit" className="btn btn-success">Submit</button>  

            </Form>
        </div>
  );
};

export default AddUser;