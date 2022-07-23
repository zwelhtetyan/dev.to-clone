import React from 'react';
import { Container } from '../../styles/AllPostStyles';
import PostItem from './PostItem';

const AllPost = () => {
   return (
      <Container>
         <PostItem
            coverImg={
               'https://res.cloudinary.com/practicaldev/image/fetch/s--YdmVca7---/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/04hjfkugtirw1xcovx5t.png'
            }
         />
         <PostItem />
         <PostItem />
         <PostItem />
         <PostItem />
      </Container>
   );
};

export default AllPost;
