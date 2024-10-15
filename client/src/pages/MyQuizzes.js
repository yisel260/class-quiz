import React,{useContext,useState} from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';
import QuizDisplay from '../components/QuizDisplay';
import EditQuiz from './EditQuiz';
import CreateQuiz from './CreateQuiz';
function MyQuizes(){
    const context = useContext(UserContext);
    const [showQuiz,setShowQuiz] = useState(false)
    const [editQuiz, setEditQuiz] = useState(false)

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
                if (row === true) 
                    return (<p>Yes</p>)
                else
                return (<p>No</p>)
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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: myQuizzes });

    function onDelete() {
        fetch(`/quizzes/${context.selectedQuiz.id}`, {
            method: 'delete',
          })
            .then((res) => {
              if (res.ok) {
                context.getQuizzes(context.user.id);
                context.setSelectedQuiz(null)
                setShowQuiz(false)
              }
            });
    }

    function handleShowQuiz(id){
        context.getQuiz(id)
        setShowQuiz(true)
        setEditQuiz(false)

    }

    function onEditClick(){
        setEditQuiz(true)
        setShowQuiz(false)
        // context.editQuiz(context.selectedQuiz.id)
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
    {showQuiz?(<>
    <button className= "mini-action-btn" onClick={()=>onEditClick(context.selectedQuiz.id)}>Edit</button>
    <button className= "mini-action-btn" onClick={()=>onDelete(context.setSelectedQuiz.id)}>Delete</button>
    <QuizDisplay/>
    </>):(null)}

    {editQuiz?(<>
    <EditQuiz setEditQuiz={setEditQuiz}/>
    </>):(null)}
    </>)}
    </>);
}


export default MyQuizes;