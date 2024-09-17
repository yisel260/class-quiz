import React, { useContext } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import NavBar from './NavBar';

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
                context.setSections(context.user.sections)
            }
        })
    }


    function updateSection(section){
        navigate(`/manageclasses/update-class/${section.id}`)
    }

    return <>MyClasses
    {context.user? (context.user.sections.map((section) => {
        return <div className="section">
                <p>{section.name}</p>
                <button onClick={()=>{deleteSection(section.id)}}>Delete Class</button>
                <button onClick={()=>{updateSection(section)}}>Update Class</button>
                </div>
})):(null)}
    </>
} 

export default MyClasses;