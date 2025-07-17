import React from 'react';

function Card({ title, text, image }) {
  return (
    <div className="col">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
        <div className="card-footer text-center">
          <a href="#" className="btn btn-primary">Find Out More!</a>
        </div>
      </div>
    </div>
  );
}

export default Card;
