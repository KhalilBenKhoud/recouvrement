import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className='list-group'>
      <thead>
      <tr>
      <th>Description</th>
      <th>Status</th>
       <th>Date</th>
      </tr>
      </thead>
      <tbody>
      {posts.map(post => (
        <tr>
        <td key={post.id} className='list-group-item'>
          {post.title}
        </td>
        <td>Pending</td>
        <td>05/04/2022</td>
        </tr>
       ))}
      </tbody>
    </table>
  );
};

export default Posts;