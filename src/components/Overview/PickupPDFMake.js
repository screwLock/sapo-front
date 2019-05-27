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
        info:{
            title: `${format(new Date(), 'MMMM Do')}`
        },

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
    routePickups.forEach( (pickup,index) => {
        document.content.push({
                text:   `${index+1}) Name: ${pickup.lastName}, ${pickup.firstName} 
                        Address: ${pickup.streetAddress}
                        Haul: ${pickup.donations.map( donation => {
                            return(`${donation}`)
                        })}
                        Pickup Details: ${pickup.serviceDetails.map( detail => {
                            return(`${detail}`)
                        })}
                        `,
                lineHeight: 1
            },
            );
    });

    // create the pdf with the supplied name
    pdfMake.createPdf(document).download(`${format(new Date(), 'MMMM Do')}`);
}

const makeURL = (user, routePickups) => {
    const waypoints = `&waypoints=${routePickups.map( pickup => `${pickup.lat},${pickup.lng}|`).join('')}`;

    const url = "https://www.google.com/maps/dir/?api=1";
    const origin = "&origin=" + user.lat + "," + user.lng;
    const destination = "&destination=" + user.lat + "," + user.lng;
    const travelMode = "&travelmode=driving"
    return new URL(url + origin + destination + travelMode + waypoints);
}