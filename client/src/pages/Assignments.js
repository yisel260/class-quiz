import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AddAssignment from '../components/AddAssignment';
import EditAssignment from '../components/EditAssignment';


// instead of displayign the student asssignments we should display the assignments by quiz instead  and  then the names of the students assigned to it 

function Assignments() {
   
    
    const context = useContext(UserContext);
    const assignments = useMemo(() => context.classAssignments || [], [context.classAssignments]);
    const [addAssignment,setAddAssignment ]= useState(false)
    const [editAssignment,setEditAssignment ]= useState(false)

    console.log(context.classAssignments)
    context.classAssignments.forEach(assignment=>console.log(assignment.quiz))

    function onDelete(assignmentId) {
        fetch(`/assignments/${assignmentId}`, {
            method: 'delete',
          })
            .then((res) => {
              if (res.ok) {
                context.getAssignments(context.sectionSelected.id);
              }
            });
    }

    function onAddAssignment(){
      setAddAssignment(true)
    }

    function doneAddingAssignments(){
      setAddAssignment(false)
    }

    function onEditAssignment(id){
      console.log("onEditassigment was called")
      const assignment =context.classAssignments.filter(assignment => assignment.id === id)
      console.log(assignment)
      context.setSelectedAssignment(assignment[0])
      setEditAssignment(true)

    }

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Quiz",
            accessor: "quiz.id",
        },
        {
            Header: "Students",
            accessor: "student_id",
        },
        {
            id: 'edit',
            accessor: 'id', 
            Cell: ({ row }) => {
                const id = row.values.id;
                return (
                    <button className= "mini-action-btn" onClick={()=> onEditAssignment(id)}>
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
                    <button className= "mini-action-btn" onClick={() => onDelete(id)}>
                        Delete
                    </button>
                );
            }
        },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: assignments });
    

    return (
        <>
        <Header/> 
        <NavBar/>
          {assignments.length > 0 ? (
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
      {addAssignment?(
      <>
      <AddAssignment/>
      <button onClick={doneAddingAssignments} className='action-btn'> Finished </button>
      </>):(<button className="action-btn" onClick={onAddAssignment}>New Assigment</button>)}
    {editAssignment?(
    <>
    <EditAssignment/> 
    </>):(null)}
        </>
      );
}

export default Assignments;