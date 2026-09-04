import PageTitle from "./PageTitle";

export default function PageHeading({title, children}) {
    return (
        <div className="pt-3.75 text-grey-950 text-[0.85rem] font-[2] text-black-500 dark:text-light font-sans mr-1">
            <PageTitle title={title} />
            <p>{children}</p>
        </div>
    );
}