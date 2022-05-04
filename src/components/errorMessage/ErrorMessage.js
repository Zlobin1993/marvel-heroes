import './errorMessage.scss';

const ErrorMessage = props => {
  return (
    <span className="error-message">{props.message || 'Ошибка!'}</span>
  )
}

export default ErrorMessage;
