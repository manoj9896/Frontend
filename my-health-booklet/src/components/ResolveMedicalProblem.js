import React,{useState} from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function ResolveMedicalProblem(props) {

    const { addPost, setaddPost, toggleAddPost,fnAddToMedicalRecord } = props

    const [medicines, setMedicines] = useState("")
    const [diagnosis, setDiagnosis] = useState("")

    return (
        <MDBModal show={addPost} setShow={setaddPost} tabIndex='-1'>
            <MDBModalDialog size="lg">
                <MDBModalContent>

                    <MDBModalHeader>
                        <MDBModalTitle>Add Details of Cure</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleAddPost}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="diagnosis">
                                Diagnosis
                            </label>
                            <textarea
                                className="form-control"
                                id="diagnosis"
                                rows={4}
                                value={diagnosis}
                                onChange={(e)=>{
                                    setDiagnosis(e.target.value)
                                }}
                                required
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="medicines">
                                Medicines
                            </label>
                            <textarea
                                className="form-control"
                                id="medicines"
                                rows={4}
                                value={medicines}
                                onChange={(e)=>{
                                    setMedicines(e.target.value)
                                }}
                                required
                            />
                        </div>

                    </MDBModalBody>

                    <MDBModalFooter>
                        <button className='btn btn-secondary' onClick={toggleAddPost}>
                            Close
                        </button>

                        <button className='btn btn-success' onClick={()=>{
                            fnAddToMedicalRecord(diagnosis,medicines)
                            setDiagnosis('')
                            setMedicines('')
                        }}>Add to Record</button>

                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>

    )
}
