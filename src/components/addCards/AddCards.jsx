import { Component } from "react";
import { Formik, Field, Form,ErrorMessage } from "formik";
import * as Yup from 'yup';
import "./AddCards.scss";

class AddCards extends Component {

    render() {
        const {toggleMenuFilter, addNewCards} = this.props;

        return (
            <div className="cards">
                <div className="cards_menu">
                    <h3 className="cards_title">Create a new shoe card</h3>
                    <Formik
                        initialValues={{ 
                            name: "", 
                            price: "" 
                        }}
                        validationSchema = {Yup.object({
                            name: Yup.string()
                                    .min(4, 'Please enter 4 characters minimum')
                                    .required('It is a required field and must be filled in.'),
                            price: Yup.number()
                                    .required('It is a required field and must be filled in.')
                                    .min(10, 'The minimum number is 10, please enter a valid number'),
                        })}
                        onSubmit={(values, actions) => {
                        addNewCards(values.name, values.price);
                        actions.resetForm({
                            values: {name: "", price: ""}})
                        }}
                    >
                        <Form className="form">
                            <Field name="name" type="text" placeholder="Name"/>
                            <ErrorMessage component="div" className="error_name" name="name"/>
                            <Field name="price" type="number" placeholder="Price"/>
                            <ErrorMessage component="div" className="error_price" name="price"/>
                            <button className="form_submit" type="submit">Add Card</button>
                        </Form>
                    </Formik>
                </div>
                <div onClick={toggleMenuFilter} className="cards_close"></div>
            </div>  
        )
    }

}

export default AddCards;