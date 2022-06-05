import React from 'react';

export const LanguageLine: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  return (
    <p className="language-line">
      <span style={{ backgroundColor: color }} />
      {name}
    </p>
  );
};
