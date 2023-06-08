// Import Moment.js
import moment from 'moment';

function getPassTime(time){
    const specificDate = moment(time);
    return specificDate.fromNow();

}
export default getPassTime