import React from 'react';

const JsonPrettier = ({jsonData}) => {
  return (
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    
  );
};

export default JsonPrettier;