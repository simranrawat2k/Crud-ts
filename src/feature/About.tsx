import React from 'react';

interface AboutProps {
  companyName: string;
  yearFounded: number;
}

const About: React.FC<AboutProps> = ({ companyName, yearFounded }) => {
  return (
    <div>
      <p>Welcome to {companyName}, founded in {yearFounded}.</p>
    </div>
  );
};

export default About;
