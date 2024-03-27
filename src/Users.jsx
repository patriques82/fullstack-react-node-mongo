import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    };
    getAllUsers();
  }, []);

  const deleteUser = async (userId) => {
    const response = await axios.delete(
      `http://localhost:3000/users/${userId}`
    );
    const deletedUser = response.data;
    setUsers((users) => users.filter((user) => user.id !== deletedUser.id));
  };

  return (
    <div>
      <h3>Users</h3>
      <Stack gap={3}>
        {users.map((user) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Body className>
                <Card.Title>{user.name}</Card.Title>
                <Stack direction="horizontal">
                  <Link to={`/users/${user.id}`} className="p-2">
                    Profile
                  </Link>
                  <Button
                    onClick={() => deleteUser(user.id)}
                    variant="danger"
                    className="p-2 ms-auto"
                  >
                    x
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          );
        })}
      </Stack>
    </div>
  );
};

export default Users;
