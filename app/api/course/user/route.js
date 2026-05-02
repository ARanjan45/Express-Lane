import { db } from '../../../../configs/db';
import { CourseList } from '../../../../configs/schema';
import { eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json([], { status: 401 });
  
  const result = await db.select().from(CourseList).where(
    eq(CourseList.createdBy, user.emailAddresses[0].emailAddress)
  );
  return Response.json(result);
}