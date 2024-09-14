import React,{useEffect,useState,useContext} from 'react';
import UserContext from '../UserContext'
import { useOutletContext } from 'react-router-dom';

function SectionSelector(){

    const context = useOutletContext(UserContext)

    return (
        <>
        <br />
        {context.user.sections?(<>
         <label htmlFor="section">Choose a class:</label>
         <select id="section-selector" value={context.sectionSelected} onChange={context.handleSectionChange} name="classesdrpdwn">
               {context.user.sections.map((section)=>{
                    return(<option value={section.id} key= {section.id} name="section" id="section" >{section.name}</option>)})}
    </select>
              </>):null}

    </>)
}

export default SectionSelector