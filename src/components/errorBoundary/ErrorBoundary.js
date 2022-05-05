import { Component } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';

import './errorBoundary.scss';

class ErrorBoundary extends Component {
  state = {
    isError: false,
  }

  componentDidCatch(error, info) {
    console.log(error, info);

    this.setState({
      isError: true,
    })
  }

  render() {
    const { isError } = this.state;

    if (isError) {
      return (
        <div className='error-wrapper'>
          <ErrorMessage message='Something went wrong.' />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
