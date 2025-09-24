import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput: json('courseOutput').notNull(), // ✅ Fixed: column name matches field name
    createdBy: varchar('createdBy').notNull(),    // ✅ Added: actual createdBy field
    userName: varchar('userName'),                 // ✅ Fixed: consistent naming
    userProfileImage: varchar('userProfileImage'),
    courseBanner:varchar('CourseBanner').default('/placeholder.png'),
    publish:boolean('publish').default(false)
});
export const Chapters=pgTable('chapters',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseid').notNull(),
    chapterId:integer('chapterId').notNull(),
    content:json('content').notNull(),
    videoId:varchar('videoId').notNull()
})