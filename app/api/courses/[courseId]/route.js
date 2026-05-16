import { db } from '../../../../configs/db';
import { CourseList } from '../../../../configs/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { courseId } = params;
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  const conditions = [eq(CourseList.courseId, courseId)];
  if (email) conditions.push(eq(CourseList.createdBy, email));

  const result = await db.select().from(CourseList).where(and(...conditions));
  return NextResponse.json(result);
}