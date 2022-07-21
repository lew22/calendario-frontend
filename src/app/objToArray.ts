
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'keys'
})

export class ObjToArrayPipe implements PipeTransform{

    transform(value:any,arg:string[]): any {
        let keys = [];
        for(let key in value){
            keys.push(key)
        }
        return keys
    }

}