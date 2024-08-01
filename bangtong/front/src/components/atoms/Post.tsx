import React from "react";
import { Link } from "react-router-dom";

interface PostsProps {
  id: number;
  title?: string;
  writer?: string;
  tag?: string;
}

const Post: React.FC<PostsProps> = ({
  id,
  title,
  writer,
  tag,
}) => {
  return (
    <tr>
      <td className="border-b border-slate-300 p-2 text-center">
        <Link to={`/boards/${id}`}>
          {title}
        </Link>
      </td>
      <td className="border-b border-slate-300 p-2 text-center">{writer}</td>
      <td className="border-b border-slate-300 p-2 text-center">{tag}</td>
    </tr>
  );
}

export default Post;