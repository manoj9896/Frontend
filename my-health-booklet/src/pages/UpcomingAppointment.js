import React,{useEffect} from 'react'

export default function Register() {

    const temp = () => {
        let question = document.querySelectorAll(".question");

        question.forEach(question => {
            question.addEventListener("click", event => {
                const active = document.querySelector(".question.active");
                if (active && active !== question) {
                    active.classList.toggle("active");
                    active.nextElementSibling.style.maxHeight = 0;
                }
                question.classList.toggle("active");
                const answer = question.nextElementSibling;
                if (question.classList.contains("active")) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = 0;
                }
            })
        })

    }

    useEffect(() => {
      temp()
    }, [])
    
    return (
        <>
            <h1>Upcoming Appointment</h1>
            <div className="wrapper">
                <div className="container">
                    <div className="question">Appointment Status</div>
                    <div className="answercont">
                        <div className="answer">
                            All medical information such as: name, id, Phone number, doctor name, status, disease. 
                            <br />
                            <br />
                            <a href="https://blog.codepen.io/documentation/features/email-verification/#how-do-i-verify-my-email-2">
                                How to Verify Email Docs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
