import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Header } from './Header';
import { ToteBoxesRow } from './toteBoxes/ToteBoxesRow'

let toteBoxesData = [
  {title: 'Product 1', 
    sub: '1 bedroom (250-500 sq ft)', 
    additionalWeek:'$35 each additional week', 
    prices: [
      {price: 90, week: 1},
      {price: 120, week: 2},
      {price: 145, week: 3},
      {price: 170, week: 4}
    ],
    indexActive: null
  },
  {title: 'Product 2', 
    sub: '2 bedroom (500-1250 sq ft)', 
    additionalWeek:'$45 each additional week', 
    prices: [
      {price: 120, week: 1},
      {price: 160, week: 2},
      {price: 195, week: 3},
      {price: 230, week: 4}
    ],
    indexActive: null
  },
  {title: 'Product 3', 
    sub: '3 bedroom (1250-2000 sq ft)',
    additionalWeek:'$60 each additional week', 
    prices: [
      {price: 165, week: 1},
      {price: 215, week: 2},
      {price: 260, week: 3},
      {price: 305, week: 4}
    ],
    indexActive: null
  },
  {title: 'Product 4', 
    sub: '4 bedroom (2000-3000 sq ft)',
    additionalWeek:'$75 each additional week', 
    prices: [
      {price: 220, week: 1},
      {price: 290, week: 2},
      {price: 335, week: 3},
      {price: 420, week: 4}
    ],
    indexActive: null
  },
  {title: 'Hand Cart', 
    sub: 'Heavy duty tubular steel cart with tires',
    additionalWeek:'', 
    prices: [
      {price: 8, week: 1},
      {price: 16, week: 2},
      {price: 24, week: 3},
      {price: 32, week: 4}
    ],
    indexActive: null
  },
  {title: 'Cart 3 Wheels', 
    sub: 'Easy-roller made to roll stacked totes',
    additionalWeek:'', 
    prices: [
      {price: 5, week: 1},
      {price: 10, week: 2},
      {price: 15, week: 3},
      {price: 20, week: 4}
    ],
    indexActive: null
  }
];
export const FormToteDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const [direction, setDirection] = useState('back');

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  let buttonClasses = ''
  buttonClasses = (nextButtonDisabled) ? 'disabled' : ''
  
  const [toteBox25, setToteBox25] = useState(formData.box25totes);
  const [toteBox35, setToteBox35] = useState(formData.box35totes);
  const [toteBox50, setToteBox50] = useState(formData.box50totes);
  const [toteBox70, setToteBox70] = useState(formData.box70totes);
  const [heavyDutyCart, setHeavyDutyCart] = useState(formData.handleCart);
  const [easyRollCart, setEasyRollCart] = useState(formData.kingcart);
  const setToteBoxesInfo = () => {

    setFormData({
      ...formData,
      'box25totes': toteBox25,
      'box35totes': toteBox35,
      'box50totes': toteBox50,
      'box70totes': toteBox70,
      'handleCart': heavyDutyCart,
      'kingcart': easyRollCart,
    });
  };

  const updateSelectedBox = (keyObj) => {
    
    switch(keyObj.parent) {
      case 0:
        setToteBox25(keyObj.child)
        break;
      case 1:
        setToteBox35(keyObj.child)
        break;
      case 2:
        setToteBox50(keyObj.child)
        break;
      case 3:
        setToteBox70(keyObj.child)
        break;
      case 4:
        setHeavyDutyCart(keyObj.child)
        break;
      case 5:
        setEasyRollCart(keyObj.child)
        break;
      default:
        //console.log('default')
    }
    toteBoxesData[keyObj.parent].indexActive = keyObj.child
  };

  let toteRows = toteBoxesData.map((toteRow, index) => {
    return <ToteBoxesRow 
                key={index} 
                trackKey={index}
                dataObj={toteRow}
                updateSelectedBox={updateSelectedBox}
            />
  });

  useEffect(() => {

    if( toteBox25 !== null || 
        toteBox35 !== null || 
        toteBox50 !== null || 
        toteBox70 !== null || 
        heavyDutyCart !== null || 
        easyRollCart !== null
      ){
      setNextButtonDisabled(false)
    }else{
      setNextButtonDisabled(true)
    }
  }, [toteBox25, toteBox35, toteBox50, toteBox70, heavyDutyCart, easyRollCart])

  return (
    <>
      <Header title='Enter Personal Details' step="Two"/>
      <div className="introWrap">
        <h2>Order details</h2>
        <p>Please select the applicable option(s) bellow.</p>
      </div>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setToteBoxesInfo(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        >
        {() => (
          <Form>
            {toteRows}
            
            <div className="formControl submitControl fullLenght">
              <button className="whiteBtn" type="submit" onClick={() => setDirection('back')}>
                <span>Previous</span>
              </button>
              <button type="submit" className={buttonClasses} onClick={() => setDirection('next')}>
                <span>Next</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

// FormToteDetails.propTypes = {
//   formData: PropTypes.object.isRequired,
//   setFormData: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired
// };
