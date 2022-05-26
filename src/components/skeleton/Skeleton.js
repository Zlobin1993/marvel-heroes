import './skeleton.scss';

const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__header">
        <div className="skeleton__circle"></div>
        <div className="skeleton__line"></div>
      </div>

      <div className="skeleton__block"></div>
      <div className="skeleton__block"></div>
      <div className="skeleton__block"></div>
    </div>
  )
}

export default Skeleton;
