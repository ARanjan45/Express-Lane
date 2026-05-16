import { db } from '../../../configs/db';
import { CourseList } from '../../../configs/schema';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '0');
  const result = await db.select().from(CourseList).limit(9).offset(page * 9);
  return NextResponse.json(result);
}