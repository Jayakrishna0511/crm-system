import axios from 'axios';

export const fetchExternalData = async (req, res) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.json(data);
};
