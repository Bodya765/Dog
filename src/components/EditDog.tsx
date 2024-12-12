import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage";

const EditDog = () => {
  const [token] = useLocalStorage('token', '');
  const navigate = useNavigate();
  const { id } = useParams(); // ID собаки з URL
  const { state } = useLocation(); // Передані дані про собаку
  const [dog, setDog] = useState(state || { name: '', age: '', breed: '', color: '' });

  const fetchDog = async () => {
    if (!state) {
      try {
        const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setDog(response.data);
      } catch (error) {
        console.error("Failed to fetch dog data:", error);
      }
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, dog, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      alert("Dog updated successfully!");
      navigate('/');
    } catch (error) {
      console.error("Failed to update dog:", error);
      alert("Failed to update dog.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDog({ ...dog, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={dog.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={dog.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Breed:
        <input
          type="text"
          name="breed"
          value={dog.breed}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Color:
        <input
          type="text"
          name="color"
          value={dog.color}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditDog;