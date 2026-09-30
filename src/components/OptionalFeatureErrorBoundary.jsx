import { Component } from 'react';
import PropTypes from 'prop-types';

class OptionalFeatureErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;

    return this.props.children;
  }
}

OptionalFeatureErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OptionalFeatureErrorBoundary;
