import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
class StreamForm extends Component {
    renderErr({error,touched}){
        if (touched&&error){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }
    renderInput=({input, label,meta})=> {
        return (
            <div className="field">
                <label> {label}</label>
                <input type="text" {...input} autoComplete="off"/>
                {this.renderErr(meta)}
            </div>
        );
    };

    onSubmit=(formValues) =>{
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" component={this.renderInput} label="Enter Title"/>
                    <Field name="description" component={this.renderInput} label="Enter Description"/>
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }


}
const validate = formValues=>{
    const errors={};
    if(!formValues.title){
        errors.title='You must enter a title'
    }
    if(!formValues.description){
        errors.description='You must enter a description'
    }
    return errors;
};
export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);