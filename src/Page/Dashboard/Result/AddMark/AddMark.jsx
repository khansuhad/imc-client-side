import { useParams } from "react-router-dom";
import useStudentClassFilter from "../../../../Hock/useStudentClassFilter";



const AddMark = () => {
    const param = useParams();
    const queryString = param.testDetails;
    const params = new URLSearchParams(queryString);

const testName = params.get('testName');
const subjectName = params.get('subjectName');
const testClass = params.get('testClass');
const date = params.get('date');
const {students} = useStudentClassFilter(testClass)
    return (
        <div>
            addMArk
        </div>
    );
};

export default AddMark;