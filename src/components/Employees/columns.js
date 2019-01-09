const columns = [{
    Header: 'ID',
    accessor: 'employeeID',
    width: 100
}, {
    Header: 'Last Name',
    accessor: 'lastName'
}, {
    Header: 'First Name',
    accessor: 'firstName'

}, {
    Header: 'Email',
    accessor: 'email'
}, {
    Header: 'Phone Number',
    accessor: 'accessor'
}, {
    Header: 'Access',
    accessor: 'access',
    width: 125,
}, {
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