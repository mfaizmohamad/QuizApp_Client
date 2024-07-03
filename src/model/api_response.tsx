class ApiResponseModel {
    status!:number;
    data!:any;
    msg!:string|undefined|unknown;
    item: any;
    ok: any;

    constructor(props?: Partial<ApiResponseModel>) {
        Object.assign(this, props);
    }
    
}
export default ApiResponseModel;