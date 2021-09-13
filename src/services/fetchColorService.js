import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = (setColors) => {
    
    axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        setColors(res.data)
      })
      .catch(e => {             
          console.log(e)
      })
}

export default fetchColorService;