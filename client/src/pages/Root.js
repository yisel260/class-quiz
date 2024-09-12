import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import TeacherHome from "./TeacherHome"
import StudentHome from "./StudentHome"

function Root (){

    const [user,setUser]=useState("")
    // const [sections, setSections]=useState("")
    // const [students,setStudents]=useState("")
    // const [sectionSelected,setSectionSelected]=useState("")
    // const [prizes, setPrizes] = useState([{}]);
    // const [section,setSection] = useState() 
    // const [mySection,setMySection]=useState()

    // useEffect(() => {
    //     fetch("/check_session").then((response) => {
    //       if (response.ok) {
    //         response.json().then((user) => setUser(user));
    //       }
    //     });
    //       }, []);

   
    useEffect(() => {
        fetch("/teachers/1")
        .then((response)=>response.json())
            .then((teacher) => setUser(teacher))
    },[])


if (user){
    if (user.role === 'teacher'){
        return <TeacherHome/>;
    }else if (user.role === "student"){
        return <StudentHome/>
    }
}else {
    return <LandingPage/>
}
}

export default Root
