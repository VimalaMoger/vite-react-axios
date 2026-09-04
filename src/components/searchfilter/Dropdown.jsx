export default function DropdownComponent ({label, options, selectedValue, handleSort}) {
    return (
        <div className="flex items-center gap-2 justify-end pr-12 flex-1 font-primary">

            <label className="text-lg font-semibold text-primary">{ label }</label>
            <select className="px-3 py-2 text-base border rounded-md transition border-primary focus:ring text-gray-900"
                value={ selectedValue } onChange={ handleSort }>
                { options.map(( optionVal, index ) => 
                    <option key={ index } value={ optionVal }>
                        { optionVal }
                    </option>
                )}
            </select>

        </div>
    );
}