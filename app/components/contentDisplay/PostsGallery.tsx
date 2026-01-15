import { getPosts } from "@/app/actions/post/getPosts";

export const PostsGallery = async () => {

    const posts = await getPosts();

    return (
        <div id="postsGallery">
            {posts.map((item) => (
                <div key={item.post.id} className="post-card">
                    <h3>{item.post.title}</h3>
                    <p>{item.post.content}</p>
                    <small>Par {item.user?.name}</small>
                </div>
            ))}
        </div>
    );
}