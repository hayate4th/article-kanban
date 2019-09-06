import React from "react";

interface CardProps {
  title: string;
  url: string;
  date: string;
}

const Card: React.FC<CardProps> = ({ title, url, date }) => {
  return <div>
    <a href={url} target="_blank">{title}</a>
    <span>{date}</span>
  </div>;
};

export default Card;
