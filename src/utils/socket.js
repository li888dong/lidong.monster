
import io from 'socket.io-client';
let host = location.origin+'/socket';
const socket = io.connect(host);
export default socket;