export default function Total({bill,service,friendService}) {


  const intl = new Intl.NumberFormat('en-us',{
    style:"currency",
    "currency":"USD"
  })

  let servicePercent = (+bill)*(+service)
  let friendServicePercent = (+bill)*(+friendService)

 const total= +bill+servicePercent+friendServicePercent

  return (
    <>
    <br />
    {`You pay: ${intl.format(total)} (${intl.format(bill)} + ${intl.format(servicePercent+friendServicePercent)} tip)  `}
    </>
    
  )
}