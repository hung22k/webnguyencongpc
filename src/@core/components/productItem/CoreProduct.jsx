import { Link } from "react-router-dom"
function CoreProduct(props){
    return (
      <div className="flex flex-col justify-between w-[19%] p-[10px] bg-[#fff] border border-grey-400 shadow">
        <Link style={{height:'210px'}} to={`/product/${props.id}`}>
          <img className="w-full" src={props.avatar} alt="" />
        </Link>
        <h2 className="">{props.name}</h2>
        <p className="text-[#575757] line-through text-[14px] font-400">
          {props.price.toLocaleString()}
        </p>
        <h3 className="font-800 text-[20px] text-[#be1f2d] font-sans-serif">
          {props.salePrice.toLocaleString()}
        </h3>
      </div>
    );
}

export default CoreProduct