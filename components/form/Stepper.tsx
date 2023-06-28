import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button } from '@mui/material';
import schema from './Schema';
import { FormStep } from './FormStep';
import { FormStepper } from './FormStepper';
import { IResult } from 'types/Comic';
import { ICheckout, IOrder } from 'types/Checkout';
import { postCheckout } from 'dh-marvel/services/checkout/checkout.service';
import  { useRouter } from 'next/router';



const steps = [
    {
      label: 'Datos Personales',
      fields: [
        { label: 'Nombre',name: 'name', type: 'text' },
        { label: 'Apellido',name: 'lastname', type: 'text' },
        { label: 'Email',name: 'email', type: 'email' },
      ],
    },
    {
      label: 'Dirección de Entrega',
      fields: [
        { label: 'Dirección', name: 'address1', type: 'text' },
        { label: 'Dirección alternativa',name: 'address2', type: 'text' },
        { label: 'Ciudad',name: 'city', type: 'text' },
        { label: 'Provincia',name: 'state', type: 'text' },
        { label: 'Codigo Postal',name: 'zipCode', type: 'number' },
      ],
    },
    {
      label: 'Datos del Pago',
      fields: [
        { label: 'Numero de tarjeta', name: 'number', type: 'number' },
        { label: 'Nombre como figura en la tarjeta', name: 'nameOnCard', type: 'text' },
        { label: 'Fecha de vencimiento', name: 'expDate', type: 'number' },
        { label: 'cvc', name: 'cvc', type: 'password' },
      ],
    },
  ];

  type MultiStepForm = {
    comic?: IResult;
  };
  
  const MultiStepForm: FC<MultiStepForm> = ({ comic }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState<string>("");
    const [checkoutData, setCheckoutData] = useState<{
      name: string;
      image: string;
      price: number;
    }>({
      name: "",
      image: "",
      price: 0,
    });
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm({
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      {
        comic &&
          setCheckoutData({
            name: comic.title,
            image: `${comic?.thumbnail.path}.${comic.thumbnail.extension}`,
            price: comic.price,
          });
      }
    }, [comic]);

  
    const handleNext = async () => {
      const currentStep = steps[activeStep];
      const fieldNames = currentStep.fields.map((field) => field.name);
      const isValid = await trigger(fieldNames);
  
      if (isValid) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    };
  
    const handlePrevious = () => {
      setActiveStep((prevStep) => prevStep - 1);
    };

    const handleError=(response:any)=>{
      if (response.error === "CARD_DATA_INCORRECT") {
        return "Datos de tarjeta incorrecta"
      }
      if (response.error === "CARD_WITHOUT_FUNDS") {
        return "Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente."
      }
      if (response.error === "CARD_WITHOUT_AUTHORIZATION") {
        return "Tarjeta sin fondos disponibles"
      }
      if (response.error === "INCORRECT_ADDRESS") {
        return "Dirección de entrega incorrecta";
      }
    
      return "Error de servidor. Intente nuevamente";
    }
  
    const onSubmit = (data: any) => {
      
      
        const { name, lastname, email, address1, address2, city, state, zipCode, number, nameOnCard, expDate, cvc } = getValues();
        const formData = {
          customer: {
          
            name,
            lastname,
            email,
            address: {
              address1,
              address2,
              city,
              state,
              zipCode: zipCode,
            },
          },
          card: {
            cvc,
            expDate,
            nameOnCard,
            number,
            
          },
          order: checkoutData,
        };
        console.log(formData);
        const response = postCheckout(formData);
       
        response.then((response) => {
          if (!response.data) {
            const error = handleError(response);
            setError(error);
            return;
          } else {
            const customer = response.data.customer;
            const order = response.data.order;
    
            localStorage.setItem(
              "checkoutData",
              JSON.stringify({
                customer: customer,
                order: order,
              })
            );
            router.push({
              pathname: "/success",
            });
          }
        });
    };
  


    
    const renderFields = () => {
      const currentStep = steps[activeStep];
  
      return (
        <FormStep
          fields={currentStep.fields}
          register={register}
          errors={errors}
        />
      );
    };
  
    return (
      <div>
          <Box
         sx={{width:"100%"}}>
        <FormStepper steps={steps} activeStep={activeStep} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderFields()}
          <div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep > 0 && (
              
               
              <Button onClick={handlePrevious} variant="contained"  sx={{ mr: 1 }} >
                Atrás
              </Button>
              
              
            )}

              <  Box sx={{ flex: "1 1 auto" }} />
            {activeStep < steps.length - 1 && (
            
              <Button onClick={handleNext} variant="contained"  >
                Siguiente
              </Button>
          
             
            )}
            {activeStep === steps.length - 1 && (
              <Button type="submit" variant="contained" >
                Enviar
              </Button>
            )}
            </Box >
          </div>
          
        </form>

        {error !== "" && (
        <Alert
          severity="error"
          sx={{
            marginTop: "30px",
          }}
        >
          {error}
        </Alert>
      )}
        </Box>
      </div>
    );
  };
  
  export default MultiStepForm;