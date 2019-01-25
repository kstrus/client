import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions/';

class StreamCreate extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">{error}</div>
            );
        }

        return null;
    };

    renderInput = (formProps) => {
        const className = `field${formProps.meta.error && formProps.meta.touched ? ' error' : ''}`;

        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"/>
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    onSubmit = (formData) => {
        this.props.createStream(formData);
    };

    render() {
        return (
            <div>
                <h2>Add new stream</h2>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                        name="title"
                        component={this.renderInput}
                        label="Enter title"
                    />
                    <Field
                        name="description"
                        component={this.renderInput}
                        label="Enter description"
                    />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

const validate = (formData) => {
    let errors = {};

    if (!formData.title) {
        errors.title = 'You must enter a title';
    }

    if (!formData.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

const formWrapped =  reduxForm({
    form: 'streamCreateForm',
    validate: validate
})(StreamCreate);

export default connect(null, {
    createStream
})(formWrapped);