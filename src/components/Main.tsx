import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
    axios.get(https://dogs.kobernyk.com/api/v1/dogs, {
      headers: {
        "Authorization": Bearer ${token}
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
        Ви авторизовані<br />
        <div className="bg-orange-700 h-5"></div>ен
        <button onClick={logout}>Вийти</button>
        <br />
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
              <Link to={/${dog._id}}>Деталі</Link>
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