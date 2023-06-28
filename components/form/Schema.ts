import * as yup from "yup";

const schema = yup.object().shape({
   name: yup.string().required('Ingrese su nombre'),
    lastname: yup.string().required('Ingrese su apellido'),
    email: yup.string().email('Ingrese un correo electrónico válido').required('Ingrese su correo electrónico'),
    address1: yup.string().required('Ingrese su dirección'),
    address2: yup.string(),
    city: yup.string().required('Ingrese su ciudad'),
    state: yup.string().required('Ingrese su provincia'),
    zipCode: yup.string().required('Ingrese su código postal'),
    number: yup.string().min(16,'Ingrese 16 números.').max(16,'Ingrese 16 números.').required('Ingrese el número de tarjeta'),
    nameOnCard: yup.string().required('Ingrese el nombre como aparece en la tarjeta de crédito'),
    expDate: yup.string().min(4, 'Ingrese mes y año xxxx.').max(4, 'Ingrese mes y año xxxx.').required('Ingrese la fecha de expiración'),
    cvc: yup.string().min(3, 'Ingrese 3 números.').max(3, 'Ingrese 3 números.').required('El código CVC es requerido.')
  });

  export default schema;