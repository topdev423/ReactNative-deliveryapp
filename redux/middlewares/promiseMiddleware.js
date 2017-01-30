/**
 * Promise middleware
 *
 * @return promise
 */

export default function promiseMiddleware(){
    return (next) => (action) => {
        const { promise, types, hasPost, ...rest } = action;
        if (!promise) {
            return next(action);
        }
        const [REQUEST, SUCCESS, FAILED] = types;
        next({ ...rest, type: REQUEST });

        if(hasPost == 'true') {
            return promise
                .then((result) => {//console.log('result', result); 
                    return next({ ...rest, result, type: SUCCESS })})
                
                .catch((error) => {//console.log('error', error); 
                    return next({ ...rest, error, type: FAILED })});
        }
        else {
            return promise.then(
                (result) => next({ ...rest, result, type: SUCCESS }),
                (error) => next({ ...rest, error, type: FAILED })
            );
        }
    };
}
