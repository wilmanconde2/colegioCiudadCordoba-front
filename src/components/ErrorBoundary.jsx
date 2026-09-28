import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className='container py-5 text-center'>
          <h1>No pudimos mostrar esta página</h1>
          <p>Ocurrió un error inesperado. Puedes recargar la página o volver al inicio.</p>
          <button className='btn btn-primary me-2' type='button' onClick={() => window.location.reload()}>
            Recargar página
          </button>
          <a className='btn btn-outline-primary' href='/'>
            Volver al inicio
          </a>
        </main>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
