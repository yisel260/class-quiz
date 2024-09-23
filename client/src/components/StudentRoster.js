import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';

function StudentRosterTable() {
    const context = useContext(UserContext);
    const sectionStudents = React.useMemo(() => context.sectionStudents, []);

    console.log(sectionStudents);

    const columns = React.useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Password",
            accessor: "password",
        },
        
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: sectionStudents });

    return (
        <>
           {context.sectionStudents.length>0? (
            <div className="student-rooster-table">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>):null}
            </>
    );
}

export default StudentRosterTable;