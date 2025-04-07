export class StringUtils{
    static toPriceFormat(price: number) :string{
        if(!price || price === 0){
            return '0';
        }

        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
}