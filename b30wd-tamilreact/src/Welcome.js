function Welcome({ name, profile }) {

  return (
    <div className="welcome">
      <img className="user-profile-pic" src={profile} alt="profile pic" />
      |<h1>Hello, {name}👍👍</h1>
    </div>
  );
}
