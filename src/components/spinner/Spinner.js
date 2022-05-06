import './spinner.scss';

const Spinner = ({ type, size }) => {
  return (
    <div className={'spinner' + (type === 'white' ? ' spinner--white' : '') + (size === 'small' ? ' spinner--small' : '')}></div>
  )
}

export default Spinner;
