import React from "react";

interface Props {
  post: {
    id: number;
    title: string;
    content: string;
    // Add any other properties of the post object
  };
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="post-column col-xl-4 col-md-6 box-border w-3/4 rounded-md p-4 shadow-lg">
      <article className="post tag-blog u-shadow flex h-full w-full flex-row">
        <div className="post-wrapper flex h-full w-full">
          <div className="post-media flex h-full w-1/3">
            <div className="u-placeholder same-height rectangle h-full w-full">
              <img
                className="post-image u-object-fit lazyautosizes lazyloaded w-full object-cover"
                src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Post Image"
              />
            </div>
          </div>
          <div className="post-right my-2 px-3">
            <header className="post-header">
              <a
                className="post-tag rounded-lg bg-blue-500 px-1 py-0.5 font-semibold text-white"
                href="#"
              >
                Blog
              </a>
              <h2 className="post-title py-1 text-3xl font-extrabold">
                <a className="post-title-link" href={`/view-post/${post.id}`}>
                  {post.title}
                </a>
              </h2>
            </header>
            <div className="post-excerpt text-md py-1 text-gray-500">
              {post.content}
            </div>
            <span className="post-card-tags text-xs text-gray-600">
              22 August 2023
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostCard;
