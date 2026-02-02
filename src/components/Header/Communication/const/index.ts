import {mail, location, phone} from '@icons/index'
import { StaticImageData } from 'next/image'

type TDataItem = {
  id: number;
  title: string;
  icon: string | StaticImageData;
}
export const data: TDataItem[]= [
    {id:0,title:'+021-95-51-84', icon:phone},
    {id:1,title:'shop@abelohost.com', icon:mail},
    {id:2,title:'1734 Stonecoal Road', icon:location},
]