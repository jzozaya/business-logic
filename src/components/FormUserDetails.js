import React, {useState, useEffect} from 'react';
import { Header } from './Header';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';


export const FormUserDetails = ({ formData, setFormData, nextStep, franchises }) => {

  
  const validationSchemaFirstStep = yup.object({
    locationType: yup
      .string()
      .required('Pick up is required'),
    serviceArea: yup
      .string()
      .required('Service Area is required'),
    pickUp: yup
      .number()
      .positive()
      .integer()
      .required('Pick up is required'),
  });

  const validateZipCode = value => {
    let stringValue = value + ''
    let error;
      if (!value) {
        error = 'Drop off required';
      } else if (stringValue.length > 5) {
        error = 'postal code is 5 digits';
      } else if (stringValue.length < 5) {
        error = 'postal code is 5 digits';
      }
      return error;
  };
  return (
    <>
      <Header title='Enter Personal Details' step="One" />

      <div className="introWrap">
        <h2>Welcome</h2>
        <p>Get started by selecting a service area to verify we service your zip codes.</p>
      </div>

      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchemaFirstStep}
        >
        {({ errors, touched }) => (
          <Form>
            <div className="formControl">
              <label htmlFor="nameImput">Service Area</label>
              <Field 
                as="select" 
                name="serviceArea"
                >
                  <option value="">select a service area</option>
                  {(franchises) ? (
                      franchises.map(p => <option key={p.id} value={p.id}>{p.location}</option>)
                  ) : ''
                  }

              </Field>
              {errors.serviceArea && touched.serviceArea && <div className="errorMessage">{errors.serviceArea}</div>}
            </div>
            <div className="formControl"></div>
            <div className="formControl">
              <label htmlFor="dropOff">Drop-off Zip Code</label>
              <Field 
                name='dropOff' 
                placeholder="zip code"
                type="number"
                validate={validateZipCode}
                />
                {errors.dropOff && touched.dropOff && <div className="errorMessage">{errors.dropOff}</div>}
            </div>
            <div className="formControl">
              <label htmlFor="pickUp">Pick-up Zip Code</label>
              <Field 
                name='pickUp' 
                placeholder="zip code"
                type="number"
                validate={validateZipCode}
                />
                {errors.pickUp && touched.pickUp && <div className="errorMessage">{errors.pickUp}</div>}
            </div>
            <div className="formControl">
              <label htmlFor="locationResidential">Location type</label>
              <div className="ratioWrap">
                <Field 
                  id="locationResidential"
                  name='locationType'
                  type="radio"
                  value="residential"
                />
                <label htmlFor="locationResidential">Residential</label>
              </div>
              <div className="ratioWrap">
                <Field 
                  id="locationCommertial"
                  name='locationType'
                  type="radio"
                  value="commertial"
                />
                <label htmlFor="locationCommertial">Commertial</label>
              </div>
              {errors.locationType && touched.locationType && <div className="errorMessage">{errors.locationType}</div>}
            </div>
            <div className="formControl submitControl">
              <button className="button global" name="submit" type="submit">
                <span>Next</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    
    
    </>
  );
};

// FormUserDetails.propTypes = {
//   formData: PropTypes.object.isRequired,
//   setFormData: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired
// };


// const mapStateToProps = state => {
//   return{
//     localCounter: state.counter
//   }
// }

// const mapDispatchToProps = state => {
//   return{
//     onIncrementCounter: () => dispatch({type: 'INCREMENT'})
//   }

// }


// export default connect(mapStateToProps, mapDispatchToProps)(FormUserDetails);