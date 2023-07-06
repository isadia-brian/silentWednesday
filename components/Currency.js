const Currency = ({ amount }) => {
  //   let code = new Intl.NumberFormat(undefined, {
  //     style: "currency",
  //     currency: "USD",
  //     currencyDisplay: "code",
  //   });
  return (
    <div>
      <p>{amount}</p>
    </div>
  );
};

export default Currency;
