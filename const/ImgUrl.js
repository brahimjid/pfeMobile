import axios from '../api/axios'
const link = axios.defaults.baseURL;
const res = link.replace('/api', '');
export default { url: `${res}/storage` };
// { url: "http://rimrndvs.000webhostapp.com/storage" };