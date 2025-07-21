import './Profile.scss';
import {jwtDecode} from 'jwt-decode';
import avatarPlaceholder from '@/assets/images/avatar-placeholder.jpg';
import {getToken} from '@/shared/lib/storage.ts';

const Profile = () => {
  const token = getToken();
  const username = token ? jwtDecode<{ username: string }>(token).username : 'Гость';

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <img
          className="profile__avatar"
          src={avatarPlaceholder}
          alt="User avatar"
          width={42}
          height={42}
        />
      </div>
      <p className="profile__username">{username}</p>
    </div>
  )
}

export default Profile;