import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDogs, setLoading, setError } from '../store/dogsSlice';

const Main = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const dispatch = useDispatch();
  const { dogs, loading, error } = useSelector((state: any) => state.dogs);
  const navigate = useNavigate();

  const logout = () => {
    setToken('');
  };

  const getDogs = () => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true));
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        dispatch(setDogs(response.data));
      })
      .catch(() => {
        logout();
        navigate('/login');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const deleteDog = (dogId: string) => {
    axios.delete(`https://dogs.kobernyk.com/api/v1/dogs/${dogId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch(setDogs(dogs.filter((dog: any) => dog._id !== dogId)));
        alert('Dog deleted successfully!');
      })
      .catch(() => {
        alert('Failed to delete dog.');
      });
  };

  const editDog = (dog: any) => {
    navigate(`/edit/${dog._id}`, { state: dog });
  };

  useEffect(() => {
    getDogs();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (token) {
    return (
      <>
        <div className="bg-orange-700 h-5">
          <div className="text-green-900">Ви авторизовані</div>
        </div>
        <button onClick={logout}>Вийти</button>
        <br />
        <Link to="/create">Create a Dog</Link>
        {dogs.map((dog: any) => (
          <Card sx={{ maxWidth: 345 }} key={dog._id}>
            <CardMedia
              sx={{ height: 140 }}
              image={dog.image}
              title={dog.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dog.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Колір: {dog.color}<br />
                Порода: {dog.breed}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/${dog._id}`}>Деталі</Link>
              <Button size="small" onClick={() => editDog(dog)}>Редагувати</Button>
              <Button size="small" color="error" onClick={() => deleteDog(dog._id)}>Видалити</Button>
            </CardActions>
          </Card>
        ))}
      </>
    );
  } else {
    return (
      <>
        <Link to="/login">Авторизуватися</Link>
      </>
    );
  }
};

export default Main;
