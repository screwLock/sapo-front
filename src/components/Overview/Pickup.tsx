import React from 'react'

interface IPickupProps {
    name: string;
    lat: number;
    lng: number;
}

class Pickup extends React.Component<IPickupProps, any> {
   public render(){
       const title= this.props.name;

       return(
           <div className="pickup">

               <div className="pickup-title">
                   {title}
               </div>
           </div>
       );
   }
}
export default Pickup;