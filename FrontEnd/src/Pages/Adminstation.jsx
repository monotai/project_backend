import React from "react";
import { updateUser, deleteUser, fetchAllUsers } from "../control.js";

const administrationPassword = "admin123"; // Example password for admin access

const Adminstation = () => {
    const [users, setUsers] = React.useState([]);
    const [adminPassword, setAdminPassword] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState(false); // Tracks admin access
    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await fetchAllUsers();
                setUsers(allUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className="adminstation-container">
            <h1>Admin Station</h1>
            <p>Welcome to the Admin Station. Here you can manage users, view logs, and perform administrative tasks.</p>
            <ul>
                {isAdmin ? (
                    <>
                        <p>Admin access granted. You can now manage users.</p>
                        <ul>
                            {users.map((user, idx) => (
                                <li key={user.id ?? idx}>
                                    <span>{user.user_id}. </span>
                                    <span>{user.name}: </span>
                                    <span>{user.password} </span>
                                    <button
                                        onClick={async () => {
                                            try {
                                                const updatedUsers = await updateUser(user.user_id, { ...user, name: user.name + " (updated)" });
                                                setUsers(updatedUsers);
                                            } catch (error) {
                                                console.error("Failed to update user:", error);
                                            }
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await deleteUser(user.user_id);
                                                setUsers(users.filter((u) => u.user_id !== user.user_id));
                                            } catch (error) {
                                                console.error("Failed to delete user:", error);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <>
                        <input
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            type="password"
                            placeholder="Enter admin password"
                        />
                        <button
                            onClick={() => {
                                if (adminPassword === administrationPassword) {
                                    setIsAdmin(true);
                                } else {
                                    alert("Incorrect password");
                                }
                            }}
                        >
                            Submit
                        </button>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Adminstation;