"use server";

import { db } from "@/src/db";
import { comment, post, postTag, tag, tagCategory, user } from "@/src/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function PostPage({ params }: Props) {
    const { id } = await params;
    const paramsId = Number(id);

    const postItem = await db
        .select()
        .from(post)
        .leftJoin(user, eq(user.id, post.userId))
        .leftJoin(comment, eq(post.id, comment.postId))
        .where(eq(post.id, paramsId));

    if (!postItem || postItem.length === 0) {
        return notFound();
    }

    const postDetail = postItem[0];

    const comments = await db
        .select()
        .from(comment)
        .leftJoin(user, eq(user.id, comment.userId))
        .where(and(eq(comment.postId, paramsId), eq(comment.commentActiveStatus, true)));

    const tags = await db.select()
        .from(postTag)
        .leftJoin(post, eq(post.id, postTag.postId))
        .leftJoin(tag, eq(tag.id, postTag.tagId))
        .leftJoin(tagCategory, eq(tagCategory.id, tag.categoryId))

    const postToModify = await db
        .select()
        .from(post)
        .where(eq(post.id, paramsId));

    if (!postDetail) {
        return (
            <main>
                <div>Aucun post ne correspond à cette route</div>
            </main>
        );
    }

    return (
        <div id="onepost" className="flex m-auto justify-center max-w-160 md:max-w-3xl lg:max-w-5xl">
            <DisplayOnePost
                postDetail={postDetail}
                comments={comments}
                postId={paramsId}
                categories={categories}
                postToModify={postToModify[0]}
                isActive={postItem[0].post.isActive}
            />
        </div>
    );
}