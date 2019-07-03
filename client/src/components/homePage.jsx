import React from "react";

const homePage = ({ user }) => {
  return (
    <div>
      <main role="main" className="text-center inner cover">
        {user ? <h2>Welcome {user.username}!</h2> : <h2>Welcome</h2>}
        <p className="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore porro
          sint fugiat debitis qui nesciunt nemo, iusto dolore expedita
          asperiores ipsum culpa sapiente? Aspernatur qui quibusdam sequi
          officia sunt quae?
        </p>
      </main>
    </div>
  );
};

export default homePage;
