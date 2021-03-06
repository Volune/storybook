import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const CheckboxFieldset = styled.fieldset({
  border: 0,
  padding: 0,
  margin: 0,
});

const CheckboxLabel = styled.label({
  fontSize: 11,
  padding: '5px',
});

const flex = ({ isInline }) => {
  if (isInline) {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      height: '100%',
    };
  }
  return null;
};

const FlexWrapper = styled.div(flex);

class CheckboxesType extends Component {
  constructor(props) {
    super(props);
    const { knob } = props;

    this.state = {
      values: knob.defaultValue || [],
    };
  }

  handleChange = e => {
    const { onChange } = this.props;
    const currentValue = e.target.value;
    const { values } = this.state;

    if (values.includes(currentValue)) {
      values.splice(values.indexOf(currentValue), 1);
    } else {
      values.push(currentValue);
    }

    this.setState({ values });

    onChange(values);
  };

  renderCheckboxList = ({ options }) =>
    Object.keys(options).map(key => this.renderCheckbox(key, options[key]));

  renderCheckbox = (label, value) => {
    const { knob } = this.props;
    const { name } = knob;
    const id = `${name}-${value}`;
    const { values } = this.state;

    return (
      <div key={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          onChange={this.handleChange}
          checked={values.includes(value)}
        />
        <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
      </div>
    );
  };

  render() {
    const { knob, isInline } = this.props;

    return (
      <CheckboxFieldset>
        <FlexWrapper isInline={isInline}>{this.renderCheckboxList(knob)}</FlexWrapper>
      </CheckboxFieldset>
    );
  }
}

CheckboxesType.defaultProps = {
  knob: {},
  onChange: value => value,
  isInline: false,
};

CheckboxesType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }),
  onChange: PropTypes.func,
  isInline: PropTypes.bool,
};

CheckboxesType.serialize = value => value;
CheckboxesType.deserialize = value => value;

export default CheckboxesType;
