import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(userResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser(id);
  }, []);

  const deleteFriend = async (friendId) => {
    try {
      const friendIds = user.friends.map((friend) => friend.id);
      const userToSend = {
        name: user.name,
        friends: friendIds.filter((fid) => fid !== friendId),
      };
      const userResponse = await axios.put(
        `http://localhost:3000/users/${user.id}`,
        userToSend
      );
      setUser(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body className>
            <Card.Title>{user.name}</Card.Title>
            <Stack direction="vertical">
              <Link to={`/users`} className="p-2">
                Go Back
              </Link>
              <p>Friends:</p>
              <ListGroup>
                {user.friends.map((friend) => (
                  <ListGroup.Item key={friend.id} as="li">
                    {friend.name}
                    <Button
                      variant="danger"
                      className="p-2 ms-auto"
                      onClick={() => deleteFriend(friend.id)}
                    >
                      x
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Stack>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Profile;
