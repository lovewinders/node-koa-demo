import AbstractError from './abstract';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';
class ConflictError extends AbstractError{
    constructor(msg){

        super();
        this.state=401;
        this.name='ConflictError';
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
    
    }

    getRestResponse(){

        return ResponseFactory.makeResponse(this.code,this.name +' '+this.message);
    
    }
}
export default ConflictError;

