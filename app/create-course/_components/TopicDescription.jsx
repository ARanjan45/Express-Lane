import React, { useContext } from 'react'
import { Input } from "../../../components/ui/input"
import {Textarea} from "../../../components/ui/textarea"
import { UserInputContext } from '../../_context/UserInputContext'
function TopicDescription() {
    const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)
    const handleInputChange=(fieldName,value)=>{
        setUserCourseInput(prev=>({
            ...prev,
            [fieldName]:value
        }))
    }
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Input Topic*/}
            <div className="mt-5">
                <label>
                    💡Write the topic for which you want to generate a course(eg:DSA, DBMS etc):
                </label>
                <Input placeholder={'Topic'} className="h-14 text-xl" defaultValue={userCourseInput?.topic} onChange={(e)=>handleInputChange('topic',e.target.value)} />
            </div>

        <div className="mt-8">
            <label>✍️Tell us more about your course,what you want to include in the course.</label>
            <Textarea placeholder="Course Description" className="h-14 text-xl" defaultValue={userCourseInput?.description} onChange={(e)=>handleInputChange('description',e.target.value)}/>
        </div>
    </div>
  )
}

export default TopicDescription