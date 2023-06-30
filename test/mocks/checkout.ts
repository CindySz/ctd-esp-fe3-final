export const checkoutMock = {
  customer: {
    name: "Test",
    lastname: "Test",
    email: "test@email.com",
    address: {
      address1: "address 123",
      address2: "address 12345",
      city: "Buenos Aires",
      state: "Buenos Aires",
      zipCode: "1200",
    },
  },
  card: {
    number: "4242424242424242",
    cvc: "123",
    expDate: "0923",
    nameOnCard: "Test User",
  },
  order: {
    name: "Marvel Previews (2017)",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    price: 50,
  },
};
