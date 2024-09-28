import React,{useEffect,useState,useContext} from 'react';
import UserContext from '../UserContext'
import { useOutletContext } from 'react-router-dom';

function SectionSelector() {
    const context = useContext(UserContext);
    

    function handleSectionChange(event) {
        console.log(event.target.value)
        const selectedSectionId = parseInt(event.target.value, 10);
        const selectedSection = context.user.sections.find(section => section.id === selectedSectionId);
        console.log(selectedSection);
        context.setSectionSelected(selectedSection);
        context.getStudents(selectedSection.id)
    }
    return (
        <>
            <br />
            {context.sections ? (
                <>
                    <label htmlFor="section">Choose a class:</label>
                    <select
                        id="section-selector"
                        value={context.sectionSelected.id}
                        onChange={handleSectionChange}
                        name="classesdrpdwn"
                    >
                        {context.sections.map((section) => (
                            <option value={section.id} key={section.id} name="section" id="section">
                                {section.name}
                            </option>
                        ))}
                    </select>
                </>
            ) : null}
        </>
    );
}


export default SectionSelector