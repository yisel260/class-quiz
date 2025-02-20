import React, { useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import SectionSelector from './SectionSelector';
import UserContext from '../UserContext';
import StudentRosterTable from './StudentRoster';

function MyClasses(){
    const context = useContext(UserContext)
    const navigate = useNavigate()

    function deleteSection(sectionId){
        fetch(`sections/${sectionId}`, {
            method: 'delete',
        })
        .then(res=>{
            if (res.ok){
                const newSectionList = context.sections.filter(section => section.id!==sectionId)
                context.setSections(newSectionList)
                context.setSectionSelected(newSectionList[0])
                context.setSectionStudents(newSectionList[0].students)
            }
        })
    }


    function updateSection(section){
        navigate(`/manageclasses/update-class/${section.id}`)
    }
    console.log(context.sectionSelected)

    return (
        <>
          {context.sectionSelected ? (
            <>
              
              <div><SectionSelector/></div>
              <br/>
              <div>
                <button className='action-btn' onClick={() => deleteSection(context.sectionSelected.id)}>Delete Class</button>
                <button className="action-btn" onClick={() => updateSection(context.sectionSelected)}>Update Class</button>
              </div>
              <br/>
              <br/>
              <div>
              <StudentRosterTable />
              
              </div>
            </>
          ) : (
            <>No classes added yet</>
          )}
        </>
      );
    }
    

export default MyClasses;