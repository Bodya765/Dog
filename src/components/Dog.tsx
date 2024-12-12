import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById } from "../api/dogsApi";
import { addDog, setLoading, setError } from "../store/dogsSlice";
import useLocalStorage from "../effects/useLocalStorage";

const Dog = () => {
  const { id } = useParams();
  const [token] = useLocalStorage("token", "");
  const dispatch = useDispatch();

  const dog = useSelector((state: any) =>
    state.dogs.dogs.find((dog: any) => dog._id === id)
  );
  const loading = useSelector((state: any) => state.dogs.loading);
  const error = useSelector((state: any) => state.dogs.error);

  useEffect(() => {
    const fetchDog = async () => {
      if (!dog && id) {
        dispatch(setLoading(true));
        try {
          const fetchedDog = await getDogById(id, token);
          dispatch(addDog(fetchedDog));
        } catch (err: any) {
          dispatch(setError(err.message));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };
    fetchDog();
  }, [dog, id, token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dog) {
    return <div>No dog found.</div>;
  }

  return (
    <div>
      <h1>{dog.name}</h1>
      <p>Age: {dog.age}</p>
      <p>Breed: {dog.breed}</p>
      <p>Color: {dog.color}</p>
      <img src={dog.image} alt={dog.name} />
    </div>
  );
};

export default Dog;
