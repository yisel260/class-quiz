
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
    const [buttonStatus,setButtonStatus]= useState(false)
    const [showTable,setShowTable]= useState(true)

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
      setShowTable(false)
    }

    function doneAddingStudents(){
      console.log("adding student done fuction callled")
      setAddStudent(false)
      setShowTable(true)
    }

    function onEditStudent(id){
      console.log("onEditStudent was called")
      console.log(context.sectionSelected.students)
      const student =context.sectionSelected.students.filter(student => student.id === id)
      console.log(student)
      context.setSelectedStudent(student[0])
      setEditStudent(true)
      setButtonStatus(true)
      setShowTable(false)

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
        {showTable ? (
          // Render the student table
          students.length > 0 ? (
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
          )
        ) : editStudent ? (
          <EditStudentForm editStudent={editStudent} setEditStudent={setEditStudent} showTable={showTable} setShowTable={setShowTable}/>
        ) : addStudent ? (
          <>
            <AddStudentForm />
            <button onClick={doneAddingStudents} className='action-btn'>Finished</button>
          </>
        ) : (
          <button className="action-btn" onClick={onAddStudent}>Add Student</button>
        )}
      </>
    );
  }

export default StudentRosterTable;