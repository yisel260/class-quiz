import React,{useEffect,useState,useContext} from 'react';
import UserContext from '../UserContext'
import { useOutletContext } from 'react-router-dom';

function SectionSelector() {
    const context = useContext(UserContext);

    function handleSectionChange(event) {
        const selectedSectionId = parseInt(event.target.value, 10);
        const selectedSection = context.user.sections.find(section => section.id === selectedSectionId);
        context.setSectionSelected(selectedSection);
    }

    return (
        <>
            <br />
            {context.user.sections ? (
                <>
                    <label htmlFor="section">Choose a class:</label>
                    <select
                        id="section-selector"
                        value={context.sectionSelected.id}
                        onChange={handleSectionChange}
                        name="classesdrpdwn"
                    >
                        {context.user.sections.map((section) => (
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