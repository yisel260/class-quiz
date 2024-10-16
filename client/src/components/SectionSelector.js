import React,{useEffect,useState,useContext} from 'react';
import UserContext from '../UserContext'
import CreateClass from './CreateClass';
import "../index.css"

function SectionSelector() {
    const context = useContext(UserContext);
    

    function handleSectionChange(event) {
        const selectedSectionId = parseInt(event.target.value, 10);
        const selectedSection = context.user.sections.find(section => section.id === selectedSectionId);
        console.log(selectedSection);
        context.setSectionSelected(selectedSection);
        context.getStudents(selectedSection.id)
    }
    return (
        <>
            <br />
            {context.sectionSelected && context.sections.length>0 ? (
                <>
                    <label className="labels" htmlFor="section">Choose a class:</label>
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
            ) :(<>
            <p>start by adding your 1st class! </p>
            <CreateClass/>
            </>)}
        </>
    );
}


export default SectionSelector