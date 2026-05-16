import { db } from '../../../../configs/db';
import { Chapters } from '../../../../configs/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { courseId } = params;
  const { searchParams } = new URL(request.url);
  const chapterId = searchParams.get('chapterId');

  if (chapterId !== null) {
    const result = await db.select().from(Chapters)
      .where(and(
        eq(Chapters.chapterId, parseInt(chapterId)),
        eq(Chapters.courseId, courseId)
      ));
    return NextResponse.json(result);
  }

  const result = await db.select().from(Chapters)
    .where(eq(Chapters.courseId, courseId));
  return NextResponse.json(result);
}