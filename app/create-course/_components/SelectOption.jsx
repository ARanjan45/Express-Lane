import React, { useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { UserInputContext } from '../../_context/UserInputContext';

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className='px-10 md:px-20 lg:px-44'>
      {/* Container for the two-column grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
          <label className='text-sm block mb-2 text-muted-foreground'>🎓Difficulty Level</label>
          <Select onValueChange={(value) => handleInputChange('Level', value)} defaultValue={userCourseInput?.Level}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='text-sm block mb-2 text-muted-foreground'>🕚Course Duration</label>
          <Select onValueChange={(value) => handleInputChange('Duration', value)} defaultValue={userCourseInput?.Duration}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30 minutes">30 Minutes </SelectItem>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="3 Hours">3 Hours </SelectItem>
              <SelectItem value="4 Hours">4 Hours</SelectItem>
              <SelectItem value="More than 4 Hours">More than 4 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='text-sm block mb-2 text-muted-foreground'>▶️Add Video</label>
          <Select onValueChange={(value) => handleInputChange('displayVideo', value)} defaultValue={userCourseInput?.displayVideo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='text-sm block mb-2 text-muted-foreground'>📖No. of Chapters</label>
          <Input 
            type="number" 
            className="w-full shadow-sm"
            defaultValue={userCourseInput?.NoOfChapter} 
            onChange={(event) => handleInputChange('NoOfChapter', event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;