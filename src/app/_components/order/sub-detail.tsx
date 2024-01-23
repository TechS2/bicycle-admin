export const SubDetail = ({ label, value } :{label:string,value:any} )=>(
    <div className="flex align-middle items-center gap-2 font-mono">
        <div className="text-gray-900 text-base font-extrabold px-2">{label}</div>
        <div className="text-gray-900 text-sm font-medium">{value}</div>
    </div>
)