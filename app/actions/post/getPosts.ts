import { post, postTag, tag, tagCategory, user } from "@/src/schema";
import { db } from "@/src/db";
import { desc, eq } from "drizzle-orm";

export const getPosts = async () => {
    const allPosts = await db.select()
        .from(post)
        .leftJoin(user, eq(user.id, post.userId))
        .leftJoin(postTag, eq(post.id, postTag.postId))
        .leftJoin(tag, eq(tag.id, postTag.tagId))
        .leftJoin(tagCategory, eq(tagCategory.id, tag.categoryId))
        .where(eq(post.postActiveStatus, true))
        .orderBy(desc(post.createdAt))
    return allPosts;
};