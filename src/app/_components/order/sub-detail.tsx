export const SubDetail = ({ label, value } :{label:string,value:any} )=>(
    <div className="flex align-middle items-center gap-2 font-serif">
        <div className="text-left text-sm font-bold px-2">{label} :</div>
        <div className="text-left text-sm font-medium">{value}</div>
    </div>
)