import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { format } from 'date-fns'



export const makeDailyPickupsPDF = (pickups, user) => () => {
    const routePickups = pickups.filter(pickup => pickup.inRoute === true)

    if(routePickups.length === 0) {
        return false;
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const document = {
        content: [{
            text: `Pickups for ${format(new Date(), 'MMMM Do YYYY')}`,
            fontStyle: 15,
            lineHeight: 4
        },
        {text:"Google Map Directions", link:`${makeURL(user)}`, decoration:"underline", fontSize:12}]
    }
    routePickups.forEach(pickup => {
        document.content.push({
            columns: [
                { text: 'Name', width: 60, fonStyle: 10 },
                { text: ':', width: 10 },
                { text: pickup.name, width: 50 },
                { text: 'lastName', width: 60 },
                { text: ':', width: 10 }, 
                { text: pickup.id, width: 50 }
            ],
            lineHeight: 2
        });
    });
    pdfMake.createPdf(document).download();
}

const makeURL = (user) => {
    const url = "https://www.google.com/maps/dir/?api=1";
    const origin = "&origin=" + user.lat + "," + user.lng;
    const destination = "&destination=" + user.lat + "," + user.lng;
    return new URL(url + origin + destination);
}