import React from 'react';
import {
   CommenntWrapper,
   Container,
   ReactionWrapper,
   ReadTime,
} from '../../styles/Reaction';
import heart from '../../assets/logo/heart.svg';
import comment from '../../assets/logo/comment.svg';

const Reaction = () => {
   return (
      <Container>
         <div>
            <ReactionWrapper>
               <img src={heart} alt='' />
               <span>
                  11 <span className='text'>Reactions</span>
               </span>
            </ReactionWrapper>
            <CommenntWrapper>
               <img src={comment} alt='' />
               {/* <span>Add Comment</span> */}
               <span>
                  11 <span className='text'>Comments</span>
               </span>
            </CommenntWrapper>
         </div>
         <ReadTime>2 min read</ReadTime>
      </Container>
   );
};

export default Reaction;
