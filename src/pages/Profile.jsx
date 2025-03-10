import useAuthStore from '../store/authStore';
import './Profile.css';

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;