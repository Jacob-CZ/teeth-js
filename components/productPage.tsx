import { Canvas } from "@react-three/fiber"
import Model from "./PillBottleProduct"
export default function ProductPage(props : {returnToEshop: () => void, product: string, acitve: boolean}) { 

    return (
        <div className="flex flex-col w-screen h-screen font-[nazare-exuberant]">
            {props.acitve &&
            <div className=" flex flex-row h-full w-full">
                <div className="h-full top-0 left-0 w-1/4 absolute" >
                <Canvas camera={{zoom: 150}} orthographic>
                    {props.product &&
                    <Model path={props.product} pos={[0,0,0]}/>
                }
                <ambientLight intensity={2} color={"#FCFBE4"} />
                <spotLight position={[0, 0, 5]} intensity={20} color={"#FCFBE4"} />
                </Canvas>
                </div>
                <div className=" w-full h-full flex flex-col justify-between">
                    <h1 className=" text-9xl self-center text-[#4D956D] font-bold">{props.product.replace(".webp", "")}</h1>
                    <button className=" font-semibold border-4 border-[#4D956D] w-fit p-2 rounded-full hover:bg-[#4D956D] transition-all hover:text-[#FCFBE4] self-end m-16" onClick={props.returnToEshop}>
                        Back to E-shop
                    </button>
                </div>
            </div>}
        </div>
    )
}