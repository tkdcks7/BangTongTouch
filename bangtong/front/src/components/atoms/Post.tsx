import React from "react";
import { Link } from "react-router-dom";

interface PostsProps {
  id: number;
  title?: string;
  writer?: string;
  tag?: string;
}

const Post: React.FC<PostsProps> = ({ id, title, writer, tag }) => {
  return (
    <tr>
      <td className="bg-gray-100 border-t-2 border-gray-200 p-2 text-center">
        <Link to={`/boards/${id}`}>{title}</Link>
      </td>
      <td className="bg-gray-100 border-t-2 border-gray-200 p-2 text-center">
        {writer}
      </td>
      <td className="bg-gray-100 border-t-2 border-gray-200 p-2 text-center">
        {tag}
      </td>
    </tr>
  );
};

export default Post;
