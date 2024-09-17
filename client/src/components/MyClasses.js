import React, { useContext } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import NavBar from './NavBar';
import SectionSelector from './SectionSelector';

function MyClasses(){
    const context = useOutletContext()
    const navigate = useNavigate()

    function deleteSection(sectionId){
        console.log(sectionId);
        fetch(`sections/${sectionId}`, {
            method: 'delete',
        })
        .then(res=>{
            if (res.ok){
                context.getSections(context.user)
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
              MyClasses
              <div><SectionSelector/></div>
              <div>
                {context.sectionSelected.name}
                <button onClick={() => deleteSection(context.sectionSelected.id)}>Delete Class</button>
                <button onClick={() => updateSection(context.sectionSelected)}>Update Class</button>
              </div>
              Student data table to be displayed here
              {/* <StudentRoster/> */}
              <div></div>
            </>
          ) : (
            <>No classes added yet</>
          )}
        </>
      );
    }
    

export default MyClasses;