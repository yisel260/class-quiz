import React, { useContext, useMemo, useTable } from 'react';
import UserContext from '../UserContext';

function QuizTable() {
    const context = useContext(UserContext);
    const quizzes = useMemo(() => context.quizzes || [], [context.quizzes]);


    console.log(context.quizzes);

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Description",
            accessor: "description",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Points",
            accessor: "point_value",
        },
        {
            Header: "Passing Score",
            accessor: "passing_score",
        },
        {
            Header: "Allow Retry",
            accessor: "retry",
        },
        {
            id: 'edit',
            accessor: 'id', 
            Cell: ({ row }) => {
                const id = row.values.id;
                return (
                    <button className= "mini-action-btn" onClick={()=> console.log(id)}>
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
                    <button className= "mini-action-btn" onClick={() => console.log(id)}>
                        Delete
                    </button>
                );
            }
        }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: quizzes });

    return (
        <>
        {quizzes.length>0 ? (
            <div className="quiz-table">
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
    ):(
        <p>No Quizzes added yet</p>
    )}
    </>
    );
}

export default QuizTable;