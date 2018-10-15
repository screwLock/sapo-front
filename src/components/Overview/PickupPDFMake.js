import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { format } from 'date-fns'



export const makeDailyPickupsPDF = (data) => () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const document = {
        content: [{
            text: `Pickups for ${format(new Date(), 'MMMM Do YYYY')}`,
            fontStyle: 15,
            lineHeight: 4
        }]
    }
    data.forEach(employee => {
        document.content.push({
            columns: [
                { text: 'firstname', width: 60, fonStyle: 10 },
                { text: ':', width: 10 },
                { text: employee.name, width: 50 },
                { text: 'lastName', width: 60 },
                { text: ':', width: 10 }, { text: employee.id, width: 50 }
            ],
            lineHeight: 2
        });
    });
    pdfMake.createPdf(document).download();
}

