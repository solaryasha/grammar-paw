'use client';

import Image from 'next/image';

const Loader = () => {
  return (
    <div className='w-25 h-25 bg-white rounded-full flex'>
      <Image 
        src='/cat-playing.gif' 
        width="75" 
        height="75" 
        alt="a cat shows from the box and hides back"
        className='rounded-full mx-auto my-auto'
      />
    </div>
  );
};

export default Loader;