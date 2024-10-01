import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';

function QuizTable() {
    const context = useContext(UserContext);
    const quizzes = React.useMemo(() => context.user.quizzes, []);

    console.log(context.user);

    const columns = React.useMemo(() => [
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
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: quizzes });

    return (
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
                                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default QuizTable;