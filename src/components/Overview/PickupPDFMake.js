import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const employees = [
    {"firstName":"John", "lastName":"Doe"}, 
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
];
const document = { content: [{text: 'Employees', fontStyle: 15, lineHeight: 2}] }
employees.forEach(employee => {
    document.content.push({
        columns: [
            { text: 'firstname', width: 60 },
            { text: ':', width: 10 },
            { text:employee.firstName, width: 50 },
            { text: 'lastName', width: 60 },
            {text: ':', width: 10 }, { text: employee.lastName, width: 50}
        ],
        lineHeight: 2
    });
});

export const makeDailyPickupsPDF = () => {
    pdfMake.createPdf(document).download();
}

