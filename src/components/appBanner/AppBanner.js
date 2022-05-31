import './appBanner.scss';
import avengers from '../../resources/img/avengers.png';
import avengersLogo from '../../resources/img/avengers-logo.png';

const AppBanner = () => {
  return (
    <div className="banner">
      <img
        className='banner__image'
        src={avengers}
        alt="Avengers"
      />

      <div className="banner__text">
        New comics every week!
        <br />
        Stay tuned!
      </div>

      <img
        className='banner__logo'
        src={avengersLogo}
        alt="Avengers Logo"
      />
    </div>
  )
}

export default AppBanner;
