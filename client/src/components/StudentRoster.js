
import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../UserContext';
import { useTable } from 'react-table';
import AddStudentForm from './AddStudentForm';
import EditStudentForm from './EditStudentForm';

function StudentRosterTable() {
    const context = useContext(UserContext);
    const students = useMemo(() => context.sectionStudents || [], [context.sectionStudents]);
    const [addStudent,setAddStudent ]= useState(false)
    const [editStudent,setEditStudent ]= useState(false)
    const [selectedStudent,setSelectedStudent] =useState(false)

    console.log(context.sectionStudents)


    function onDelete(studentId) {
        fetch(`/students/${studentId}`, {
            method: 'delete',
          })
            .then((res) => {
              if (res.ok) {
                context.getStudents(context.sectionSelected.id);
              }
            });
    }

    function onAddStudent(){
      setAddStudent(true)
    }

    function doneAddingStudents(){
      console.log("adding student done fuction callled")
      setAddStudent(false)
    }

    function onEditStudent(id){
      console.log(context.sectionStudents)
      const student = students.filter(student => student.id === id)
      console.log(student)
      setSelectedStudent(student[0])
      setEditStudent(true)

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
                    <button className= "mini-action-btn" onClick={()=> onEditStudent(id)}>
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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: students });
    

    return (
        <>
          {students.length > 0 ? (
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
      {addStudent?(
      <>
      <AddStudentForm/>
      <button onClick={doneAddingStudents} className='action-btn'> Finished </button>
      </>):(<button className="action-btn" onClick={onAddStudent}>Add Student</button>)}
      {editStudent?(
      <>
      <EditStudentForm 
      selectedStudent={selectedStudent}
      editStudent={editStudent}
      setEditStudent={setEditStudent}/>
      </>):(null)}
        </>
      );
}

export default StudentRosterTable;