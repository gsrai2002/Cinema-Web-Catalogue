import React from 'react';

const images_api= "https://image.tmdb.org/t/p/w1280";


const Member = ({name, role, image}) => {
  return (
    <div className="member">
        <img className="image" src={image?images_api+image:"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} alt="Profile" />
        <p className="name">{name}</p>
        {role && <p className="role">{role}</p>
}
    </div>
  )
}

export default Member