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

export const addInches = (size: string) => {
    size = size.replace(/ /g, "");
    const sizeAttributes: string[] = size.split("");
    const symbolRemoved = sizeAttributes.filter((data: string) => Number(data))
    const data: string[] = []
    for (let i = 0; i < symbolRemoved.length; i += 2)
        data.push(`${symbolRemoved[i]}${symbolRemoved[i + 1]}" `)
    return data;
}

export const  convertDate = (dateString :string)=> {
    const [month, day, year] = dateString.split('/');
    const convertedDateString = `${day}/${month}/${year}`;
    return convertedDateString;
  }
  