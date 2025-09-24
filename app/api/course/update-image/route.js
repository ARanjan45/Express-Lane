import { db } from '../../../../configs/db';
import { CourseList } from '../../../../configs/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const body = await request.json();
    const { courseId, imageUrl, userEmail } = body;

    console.log('API called with:', { courseId, imageUrl, userEmail });

    if (!courseId || !imageUrl || !userEmail) {
      console.log('Missing fields:', { courseId: !!courseId, imageUrl: !!imageUrl, userEmail: !!userEmail });
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    console.log('Updating course image in database...');

    // Update the course image in database
    const result = await db
      .update(CourseList)
      .set({
        courseBanner: imageUrl,
      })
      .where(
        and(
          eq(CourseList.courseId, courseId),
          eq(CourseList.createdBy, userEmail)
        )
      )
      .returning();

    console.log('Database update result:', result);

    if (result.length === 0) {
      console.log('No course found with courseId:', courseId, 'and email:', userEmail);
      
      // Let's check if the course exists at all
      const existingCourse = await db.select().from(CourseList)
        .where(eq(CourseList.courseId, courseId));
      
      console.log('Existing course check:', existingCourse);
      
      return NextResponse.json(
        { 
          error: 'Course not found or unauthorized', 
          debug: {
            courseExists: existingCourse.length > 0,
            providedEmail: userEmail,
            courseOwner: existingCourse[0]?.createdBy
          }
        }, 
        { status: 404 }
      );
    }

    console.log('Successfully updated course image');

    return NextResponse.json({
      success: true,
      course: result[0],
      message: 'Course image updated successfully'
    });

  } catch (error) {
    console.error('Database update error:', error);
    return NextResponse.json(
      { error: 'Failed to update course', details: error.message },
      { status: 500 }
    );
  }
}