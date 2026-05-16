import { db } from '../../../configs/db';
import { Chapters, CourseList } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const result = await db.insert(Chapters).values({
    chapterId: body.chapterId,
    courseId: body.courseId,
    content: body.content,
    videoId: body.videoId
  });
  return NextResponse.json(result);
}