import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(/*TODO*/);
        return res.data || [];
    }
}