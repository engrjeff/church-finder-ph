'use client';

import React from 'react';
import toast from 'react-hot-toast';

function PersonalPage() {
  return (
    <div>
      <button onClick={() => toast.success('Success!')}>Show Toast</button>
    </div>
  );
}

export default PersonalPage;
