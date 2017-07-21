import AbstractError from './abstract';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';

class ForbiddenError extends AbstractError{
    constructor(msg){

        super();
        this.state=403;
        this.code = ResponseCode.FAILURE;
        this.message = msg || '';
        this.name='ForbiddenError';
    
    }

    getRestResponse(){

        return ResponseFactory.makeResponse(this.code,this.name+ ' '+ this.message);
    
    }
}
export default ForbiddenError;
