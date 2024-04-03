import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
   

    // Debouncing function
    let timeout;
    function debouncing() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fatch();
        }, 900); // Adjust the debounce delay as needed
    }

    // Fetch users function
    function fatch() {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                Authorization:localStorage.getItem('token') || ''
            }
        })
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        debouncing(); // Initial call based on filter value
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button onClick={(e)=>{
                    navigate(`/send-money?id=${user._id}&name=${user.firstName}`)
                }} label={"Send Money"} />
            </div>
        </div>
    );
}
