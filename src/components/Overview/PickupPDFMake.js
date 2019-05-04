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
            link:`${makeURL(user, routePickups)}`,
            bold: true,
            color: 'blue',
            fontSize: 25,
            lineHeight: 4
        },
        ]
    }
    routePickups.forEach(pickup => {
        document.content.push({
                text: `Name: ${pickup.name} Address: ${pickup.streetAddress}`,
                lineHeight: 2
            },
            );
    });
    pdfMake.createPdf(document).download();
}

const makeURL = (user, routePickups) => {
    const waypoints = `&waypoints=${routePickups.map( pickup => `${pickup.lat},${pickup.lng}|`).join('')}`;

    const url = "https://www.google.com/maps/dir/?api=1";
    const origin = "&origin=" + user.lat + "," + user.lng;
    const destination = "&destination=" + user.lat + "," + user.lng;
    const travelMode = "&travelmode=driving"
    return new URL(url + origin + destination + travelMode + waypoints);
}