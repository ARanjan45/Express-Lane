import CategoryList from '../../_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserInputContext } from '../../_context/UserInputContext'

function SelectCategory() {
  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)
  const handleCategoryChange=(category)=>{
    setUserCourseInput(prev=>({
      ...prev,
      category:category
    }))
  }
  return (
    <div className='grid grid-cols-3 gap-15 px-10 md:px-20'>
        
        {CategoryList.map((item,index)=>(
            <div key={index} className={`flex flex-col items-center p-5 border rounded-xl hover:border-primary hover:bg-gray-900 cursor-pointer${userCourseInput?.category==item.name&&'border-primary bg-gray-900'}`} onClick={()=>handleCategoryChange(item.name)}>
                <Image src={item.icon} width={50} height={50} alt="img"/>
                <h2>{item.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default SelectCategory