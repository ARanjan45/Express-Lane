import { db } from '../../../configs/db';
import { CourseList } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
  const result = await db.select().from(CourseList).where(eq(CourseList.createdBy, email));
  return NextResponse.json(result);
}

export async function POST(request) {
  const body = await request.json();
  const result = await db.insert(CourseList).values({
    courseId: body.courseId,
    name: body.name,
    level: body.level,
    category: body.category,
    courseOutput: body.courseOutput,
    createdBy: body.createdBy,
    userName: body.userName,
    userProfileImage: body.userProfileImage,
    includeVideo: body.includeVideo
  });
  return NextResponse.json(result);
}

export async function PUT(request) {
  const body = await request.json();
  const result = await db.update(CourseList)
    .set(body.fields)
    .where(eq(CourseList.id, body.id))
    .returning({ id: CourseList.id });
  return NextResponse.json(result);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const resp = await db.delete(CourseList)
    .where(eq(CourseList.id, parseInt(id)))
    .returning({ id: CourseList.id });
  return NextResponse.json(resp);
}

export async function PATCH(request) {
  const body = await request.json();
  const result = await db.update(CourseList)
    .set({ publish: true })
    .where(eq(CourseList.courseId, body.courseId));
  return NextResponse.json(result);
}