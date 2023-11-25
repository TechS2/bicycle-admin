
export const addEuroSign = (price: string) => {
    const numericPrice = parseFloat(price);
  
    if (!isNaN(numericPrice)) {
        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR'
        }).format(numericPrice);
        return formattedPrice;
    } else {
        console.error('Invalid price input');
        return price;
    }
  }