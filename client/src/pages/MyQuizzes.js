import React,{useContext,useState, useEffect} from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';
import QuizDisplay from '../components/QuizDisplay';
import EditQuiz from './EditQuiz';
import CreateQuiz from './CreateQuiz';
function MyQuizes(){
    const context = useContext(UserContext);
    const myQuizzes = React.useMemo(() => context.quizzes , [context.quizzes]);
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
            Cell: ({row})=>{
                if (row.values.retry === true) 
                    return (<p>no</p>)
                else
                return (<p>yes</p>)
            }
        },
        {
            id: 'show-quiz',
            accessor: 'id', 
            Cell: ({ row }) => {
                const id = row.values.id;
                return (
                    <button className= "mini-action-btn" onClick={()=> handleShowQuiz(id)}>
                        Show quiz
                    </button>
                );
            }
        },
    ], []);
   
    useEffect(() => {
        context.setNewQuiz(null);
    }, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: myQuizzes });



    function handleShowQuiz(id){
        context.getQuiz(id)
        context.setShowQuiz(true)
        context.setEditQuiz(false)

    }

    return (
        <>
       {context.addingQuiz?(<CreateQuiz/>):( <>
        {myQuizzes.length>0 ? (
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
    <br/>
    {context.showQuiz?(<>
    <br/>
    <QuizDisplay/>
    </>):(null)}

    {context.editQuiz?(<>
    <EditQuiz />
    </>):(null)}
    </>)}
    </>);
}


export default MyQuizes;