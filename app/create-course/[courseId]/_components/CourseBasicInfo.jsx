import Image from 'next/image'
import React, { useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from '../../../../components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import Link from 'next/link';

function CourseBasicInfo({ course, refreshData,edit=true}) {
    const [selectedFile, setSelectedFile] = useState();
    const [uploading, setUploading] = useState(false);
    const { user } = useUser();
    
    const onFileSelected = async (event) => {
        const file = event.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }
        
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size should be less than 10MB');
            return;
        }
        
        // Show preview immediately
        const previewUrl = URL.createObjectURL(file);
        setSelectedFile(previewUrl);
        
        try {
            setUploading(true);
            toast.loading('Uploading image...', { id: 'upload' });
            
            // Upload directly to Cloudinary using unsigned upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', 'course-images');
            
            console.log('Uploading to Cloudinary...');
            console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
            console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            
            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            
            const uploadResult = await uploadResponse.json();
            console.log('Cloudinary response:', uploadResult);
            
            if (!uploadResponse.ok || uploadResult.error) {
                throw new Error(uploadResult.error?.message || 'Upload failed');
            }
            
            console.log('Upload successful, updating database...');
            console.log('Course data:', course);
            console.log('User email:', user?.primaryEmailAddress?.emailAddress);
            
            // Update database
            const updateResponse = await fetch('/api/course/update-image', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: course.courseId,
                    imageUrl: uploadResult.secure_url,
                    userEmail: user?.primaryEmailAddress?.emailAddress
                }),
            });
            
            const updateResult = await updateResponse.json();
            console.log('Database update result:', updateResult);
            console.log('Response status:', updateResponse.status);
            
            if (!updateResult.success) {
                console.error('Update failed:', updateResult);
                throw new Error(updateResult.error || 'Failed to update course');
            }
            
            toast.success('Course image updated successfully!', { id: 'upload' });
            
            // Clean up the preview URL
            URL.revokeObjectURL(previewUrl);
            
            // Refresh the course data
            if (refreshData) {
                refreshData();
            }
            
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(`Failed to update image: ${error.message}`, { id: 'upload' });
            
            // Reset to previous image on error
            setSelectedFile(null);
            URL.revokeObjectURL(previewUrl);
        } finally {
            setUploading(false);
        }
    };

    const courseData = course?.courseOutput;
    
    // Determine which image to show
    const displayImage = selectedFile || course?.courseBanner || '/placeholder.png';
    
    return (
        <div className='bg-card rounded-2xl shadow-lg border border-border mt-8 overflow-hidden max-w-4xl mx-auto'>
            {/* Header Section */}
            <div className='bg-gradient-to-r from-primary via-chart-2 to-chart-3 p-8 text-primary-foreground'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                    {/* Content Section */}
                    <div className='order-2 lg:order-1'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2'>
                                <HiOutlinePuzzle className='text-lg' />
                                <span className='font-medium text-sm'>{course?.category || 'Course'}</span>
                            </div>
                        </div>
                        
                        <div className='flex items-center gap-2 mb-4'>
                            <h1 className='font-bold text-3xl lg:text-4xl leading-tight'>
                                {course?.name || courseData?.courseName || 'Course Name Not Available'}
                            </h1>
                            {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData()} />}
                        </div>
                        
                        <p className='text-primary-foreground/80 text-base lg:text-lg leading-relaxed mb-6'>
                            {courseData?.description || course?.courseOutput?.course?.description || 'Transform your skills with this comprehensive course designed for learners at all levels.'}
                        </p>

                        {/* Action Button */}
                        {!edit && <Link href={'/course/' + course?.courseId + "/start"}>
                            <Button className='w-full sm:w-auto bg-primary-foreground hover:bg-primary-foreground/90 text-primary border-0 font-semibold py-3 px-8 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                                Start Learning Journey
                            </Button>
                        </Link>}
                    </div>

                    {/* Image Section */}
                    <div className='order-1 lg:order-2'>
                        <div className='relative'>
                            <label htmlFor='upload-image' className={`block cursor-pointer ${uploading ? 'pointer-events-none opacity-75' : ''}`}>
                                <div className='relative overflow-hidden rounded-xl border-2 border-primary-foreground/20 hover:border-primary-foreground/40 transition-all duration-300'>
                                    <Image 
                                        src={displayImage} 
                                        width={300} 
                                        height={300}
                                        className='w-full h-[250px] object-cover transition-all duration-300 hover:scale-105' 
                                        alt='Course Image'
                                        priority
                                        onError={() => {
                                            console.error('Image load error');
                                        }}
                                    />
                                    {uploading && (
                                        <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
                                            <div className='flex flex-col items-center text-white'>
                                                <div className='w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin mb-3'></div>
                                                <span className='text-sm font-medium'>Uploading...</span>
                                                <span className='text-xs opacity-75'>Please wait</span>
                                            </div>
                                        </div>
                                    )}
                                    {!uploading && (
                                        <div className='absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                                            <div className='bg-white/90 rounded-full p-3 shadow-lg'>
                                                <svg className='w-6 h-6 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </label>
                            {edit &&<input 
                                type="file" 
                                id="upload-image" 
                                className='hidden' 
                                onChange={onFileSelected}
                                accept='image/jpeg,image/png,image/webp,image/gif'
                                disabled={uploading}
                            />}
                        </div>
                        <p className='text-primary-foreground/60 text-xs text-center mt-2'>
                            {uploading ? 'Uploading...' : 'Click to upload new image (Max 10MB)'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseBasicInfo