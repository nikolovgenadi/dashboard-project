import axios from "axios";
const url = 'https://jsonplaceholder.typicode.com/users';
async function getUser(url) {
    try {
      const response = await axios.get(url);
      console.log(response);

      const firstUserId = response.data.length > 0 ? response.data[0].id : undefined;
      return console.log({firstUserId});
    } catch (error) {
      console.error(error);
    }
  }
getUser(url);

