
import React, { useContext, useMemo } from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';

function StudentRosterTable() {
    const context = useContext(UserContext);
    const sectionStudents = useMemo(() => context.sectionStudents || [], [context.sectionStudents]);

    console.log(sectionStudents);

    function onDelete(studentId) {
        console.log(studentId);
        fetch(`/students/${studentId}`, {
            method: 'delete',
          })
            .then((res) => {
              if (res.ok) {
                context.getStudents(context.sectionSelected.id);
              }
            });
    }

    const columns = useMemo(() => [
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
        {
            id: 'edit',
            accessor: 'id', 
            Cell: ({ row }) => {
                const id = row.values.id;
                return (
                    <button onClick={() => console.log(id)}>
                        Edit
                    </button>
                );
            }
        },

        {
            id: 'delete',
            accessor: 'id', 
            Cell: ({ row }) => {
                const id = row.values.id;
                return (
                    <button onClick={() => onDelete(id)}>
                        Delete
                    </button>
                );
            }
        },
    ], []);

    // Call useTable unconditionally
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: sectionStudents });
    

    return (
        <>
          {sectionStudents.length > 0 ? (
            <div className="student-rooster-table">
              <table {...getTableProps()}>
                <thead>
  
                  {headerGroups.map((headerGroup) => (
                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
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
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No students available.</p>
          )}
        </>
      );
}

export default StudentRosterTable;