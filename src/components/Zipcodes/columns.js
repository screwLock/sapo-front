const columns = [{
    Header: 'ID',
    accessor: 'zipcodeID',
    width: 100
}, {
    Header: 'Zipcode',
    accessor: 'zipcode'
}, {
    Header: 'Weekdays',
    accessor: 'weekdays'

}, 
{
    Header: 'Actions',
    Cell: row => (
        <div>
            <Button intent={Intent.PRIMARY} icon="edit" />
            <span style={{'margin': '5px'}} />
            <Button intent={Intent.DANGER} icon="trash" />
        </div>
    )
}
]

export default columns;