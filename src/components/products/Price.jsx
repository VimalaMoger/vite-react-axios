export default function PriceComponent({currency, price}) {
    return (
        <span className="text-xl font-bold text-primary dark:text-light">{currency} {price}</span>
    );
}